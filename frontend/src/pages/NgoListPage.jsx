
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ngos = [
  { id: 1, name: "Green Future Foundation", type: "Environmental", mission: "Planting trees and promoting reforestation." },
  { id: 2, name: "Food for All", type: "Hunger Relief", mission: "Distributing surplus food to needy communities." },
  { id: 3, name: "Community Care", type: "Social Welfare", mission: "Providing support and resources for local families." },
  { id: 4, name: "Eco Warriors", type: "Environmental", mission: "Focused on cleaning up local parks and rivers." },
  { id: 5, name: "The Helping Hand", type: "Humanitarian", mission: "Emergency relief and support for disaster-stricken areas." },
];

const NgoListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const handleDonate = (ngo) => {
    alert(`Donated "${product.name}" to ${ngo.name}!`);
    navigate('/seller');
  };

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">No product information available.</h1>
        <button onClick={() => navigate('/seller')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Donate {product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo) => (
          <div key={ngo.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{ngo.name}</h2>
              <p className="text-gray-600 mb-4">{ngo.mission}</p>
              <p className="text-sm text-gray-500">Type: {ngo.type}</p>
            </div>
            <button
              onClick={() => handleDonate(ngo)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Donate to this NGO
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NgoListPage;
