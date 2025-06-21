# 🌿 GreenCart – Eco-Friendly E-Commerce Platform

GreenCart is an environment-focused e-commerce platform that promotes sustainability through three key features:

1. **Green Score Calculator** – Assess the environmental impact of your cart items using AI.
2. **Donation Option** – Products nearing expiry can be donated to reduce waste.
3. **Dynamic Pricing** – Prices adjust based on expiry date and stock levels to reduce overproduction and encourage timely purchase.

---

## 💡 Features

- ♻️ **Green Score Calculation** powered by AI (Nebius API)
- 🧾 **Donation System** for products nearing expiry
- 📉 **Dynamic Pricing** based on expiry and stock status
- 🛒 Standard e-commerce features: Add to cart, update quantity, checkout

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/greencart.git
cd greencart
```

### 2. Install Dependencies

- **Frontend:**

```bash
cd frontend
npm install
```

- **Backend:**

```bash
cd ../backend
npm install
```

### 3. Run the Application

Open **two terminal windows**:

- **Terminal 1 – Frontend**

```bash
cd frontend
npm run dev
```

- **Terminal 2 – Backend**

```bash
cd backend
npm start
```

The frontend will usually run on `http://localhost:3000` and backend on `http://localhost:5000`.

---

## 🔐 Environment Variables

To enable Green Score calculation using AI, you'll need a Nebius API Key.

### Steps:

1. Visit [Nebius AI Studio](https://studio.nebius.ai) and sign up / log in.
2. Navigate to the API keys section and generate a key.
3. Create a `.env` file inside the `backend/` folder:

```
NEBIUS_API_KEY=your_api_key_here
```

If no key is provided, the app will fall back to mock data.

---

## 📊 Green Score Calculation Logic

The AI model evaluates the environmental friendliness of products based on:

- Packaging material
- Shipping method
- Ingredients/materials used
- Quantity of each product

**Score Range:** 0 (least eco-friendly) to 100 (most eco-friendly).

Suggestions for improvement are also generated per product.

---

## 🎁 Donation Logic

- Items with expiry dates close to the current date are flagged.
- If stock is unsold past a threshold, the system recommends donating.
- Users can opt-in for donation during checkout.

---

## 💸 Dynamic Pricing Logic

- Items closer to expiry = higher discount.
- Overstocked items = incentivized with lower prices.
- Algorithm recalculates prices daily.

---

## 📦 Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **AI Integration:** Nebius API (Chat Completion)
- **State Management:** Context API
- **Hosting:** Suitable for Vercel + Render / Railway deployments

---

## 📄 License

MIT License © 2025 GreenCart Team

---

## 🤝 Contributing

We welcome contributions! Open issues or submit PRs to enhance eco-commerce.
