import ProductListSeller from "../components/seller/ProductListSeller"

const SellerPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Seller Dashboard</h1>
        <p className="text-xl text-gray-600">Manage your eco-friendly products and donations</p>
      </div>
      <ProductListSeller />
    </div>
  )
}

export default SellerPage
