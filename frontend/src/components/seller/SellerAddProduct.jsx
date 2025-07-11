import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerAddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    packaging: "",
    shipping: "",
    initialPrice: "",
    imageUrl: "",
    timeToExpiry: "",
    reductionPerDay: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const sellerId = user?.id || user?._id;
      if (!sellerId) throw new Error("Seller ID not found. Please log in again.");
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          initialPrice: parseFloat(form.initialPrice),
          timeToExpiry: parseInt(form.timeToExpiry),
          reductionPerDay: parseFloat(form.reductionPerDay),
          sellerId,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add product");
      }
      setSuccess("Product added successfully!");
      setForm({
        name: "",
        description: "",
        packaging: "",
        shipping: "",
        initialPrice: "",
        imageUrl: "",
        timeToExpiry: "",
        reductionPerDay: "",
      });
      setTimeout(() => navigate("/seller"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Packaging</label>
          <input
            type="text"
            name="packaging"
            value={form.packaging}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Shipping</label>
          <input
            type="text"
            name="shipping"
            value={form.shipping}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Initial Price</label>
          <input
            type="number"
            name="initialPrice"
            value={form.initialPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Time to Expiry (days)</label>
          <input
            type="number"
            name="timeToExpiry"
            value={form.timeToExpiry}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Reduction Per Day</label>
          <input
            type="number"
            name="reductionPerDay"
            value={form.reductionPerDay}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            min="0"
            step="0.01"
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-all"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default SellerAddProduct; 