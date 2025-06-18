const GreenScoreResults = ({ data }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  if (!data || !Array.isArray(data.products)) {
    return (
      <div className="mt-8 text-center text-gray-500">
        Loading results or no data available.
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🌱 Green Score Results</h2>

      {/* Overall Score */}
      <div className={`text-center mb-8 p-6 rounded-lg ${getScoreBg(data.overall_score)}`}>
        <h3 className="text-xl font-semibold mb-2">Overall Cart Score</h3>
        <div className={`text-4xl font-bold ${getScoreColor(data.overall_score)}`}>
          {data.overall_score}/100
        </div>
        <p className="text-gray-600 mt-2">
          {data.overall_score >= 80
            ? "Excellent sustainability!"
            : data.overall_score >= 60
            ? "Good, but room for improvement"
            : "Consider more eco-friendly alternatives"}
        </p>
      </div>

      {/* Individual Product Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3">{product.name}</h4>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Overall Score:</span>
                <span className={`font-bold ${getScoreColor(product.score)}`}>
                  {product.score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Packaging:</span>
                <span className={getScoreColor(product.packaging_score)}>
                  {product.packaging_score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className={getScoreColor(product.shipping_score)}>
                  {product.shipping_score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Materials:</span>
                <span className={getScoreColor(product.ingredients_score)}>
                  {product.ingredients_score}/100
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-sm mb-2">💡 Suggestions:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GreenScoreResults
