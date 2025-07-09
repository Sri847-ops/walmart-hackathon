import ProductListSeller from "../components/seller/ProductListSeller";

const SellerPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          Seller Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your eco-friendly products and donations.
        </p>
      </div>
      <ProductListSeller />
    </div>
  );
};

export default SellerPage;
