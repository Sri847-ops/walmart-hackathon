const express = require("express")
const router = express.Router()
const OpenAI = require("openai")

// Initialize OpenAI client for Nebius API
const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
})

const systemPrompt = `You are an AI sustainability expert. Given a list of products, calculate a green score based on eco-friendliness, packaging material, shipping method, and sustainability of ingredients. The green score is from 0 to 100, where higher is more eco-friendly.

For each product, analyze the packaging, ingredients, and possible carbon impact. If the product has vague or insufficient information, assume average commercial packaging and logistics. Return suggestions for improving sustainability.

Return ONLY the following JSON format and nothing else:

{
  "overall_score": <integer 0–100>,
  "products": [
    {
      "name": "<product name>",
      "score": <integer 0–100>,
      "packaging_score": <0–100>,
      "shipping_score": <0–100>,
      "ingredients_score": <0–100>,
      "suggestions": ["<tip1>", "<tip2>", ...]
    },
    ...
  ]
}`

async function calculateGreenScore(products) {
  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: JSON.stringify(products),
    },
  ]

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1",
      max_tokens: 8192,
      temperature: 0.6,
      top_p: 0.95,
      messages: messages,
    })

    return JSON.parse(response.choices[0].message.content)
  } catch (err) {
    console.error("Error calling AI model:", err)
    return null
  }
}

// Mock function for testing without API key
function getMockGreenScore(products) {
  const mockScores = {
    "Organic Green Tea": { score: 85, packaging: 90, shipping: 80, ingredients: 90 },
    "Plastic Water Bottle": { score: 25, packaging: 15, shipping: 30, ingredients: 30 },
    "Bamboo Toothbrush": { score: 92, packaging: 95, shipping: 85, ingredients: 95 },
    "LED Light Bulb": { score: 78, packaging: 70, shipping: 75, ingredients: 85 },
    "Organic Cotton T-Shirt": { score: 88, packaging: 85, shipping: 80, ingredients: 95 },
  }

  const productScores = products.map((product) => {
    const mock = mockScores[product.name] || { score: 50, packaging: 50, shipping: 50, ingredients: 50 }
    return {
      name: product.name,
      score: mock.score,
      packaging_score: mock.packaging,
      shipping_score: mock.shipping,
      ingredients_score: mock.ingredients,
      suggestions: [
        "Consider eco-friendly packaging alternatives",
        "Opt for local or carbon-neutral shipping",
        "Look for products with sustainable materials",
      ],
    }
  })

  const overallScore = Math.round(productScores.reduce((sum, product) => sum + product.score, 0) / productScores.length)

  return {
    overall_score: overallScore,
    products: productScores,
  }
}

// POST /api/green-score/calculate
router.post("/calculate", async (req, res) => {
  try {
    const { products } = req.body

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Products array is required" })
    }

    let result

    // Use real API if key is available, otherwise use mock data
    if (process.env.NEBIUS_API_KEY) {
      result = await calculateGreenScore(products)
      if (!result) {
        return res.status(500).json({ error: "Failed to calculate green score" })
      }
    } else {
      console.log("Using mock data - add NEBIUS_API_KEY to use real AI scoring")
      result = getMockGreenScore(products)
    }

    res.json(result)
  } catch (error) {
    console.error("Error in green score calculation:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
