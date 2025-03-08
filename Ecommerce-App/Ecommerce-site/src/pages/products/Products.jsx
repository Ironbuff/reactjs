import React from "react";

const products = [
  {
    id: 1,
    webformatURL: "https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg",
    tags: "Laptop",
  },
  {
    id: 2,
    webformatURL: "https://media.istockphoto.com/id/2172810239/photo/top-view-digitally-rendered-modern-home-office-with-wooden-desk-and-natural-decor.jpg?s=2048x2048&w=is&k=20&c=ESJJg1G1hF7Pe8AODbutgb8MGUn5w3SKxcfhv4K7DBg=",
    tags: "Home Office",
  },
  {
    id: 3,
    webformatURL: "https://media.istockphoto.com/id/1409132920/photo/a-mans-hand-takes-a-picture-of-a-tropical-beach-using-a-smartphone.jpg?s=2048x2048&w=is&k=20&c=k4JwJDE1xOZqaSxyTzc_OIM54_Ws7bnFgYYXfkfJRLI=",
    tags: "iPhone",
  },
  {
    id: 4,
    webformatURL: "https://cdn.pixabay.com/photo/2016/11/10/16/18/android-1814600_1280.jpg",
    tags: "Smartphone",
  },
  {
    id: 5,
    webformatURL: "https://cdn.pixabay.com/photo/2022/01/24/18/06/smart-watch-6964296_1280.jpg",
    tags: "Smartwatch",
  },
  {
    id: 6,
    webformatURL: "https://cdn.pixabay.com/photo/2015/07/17/22/42/typing-849806_960_720.jpg",
    tags: "Keyboard",
  },
];

const ProductPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="shadow-lg rounded-lg overflow-hidden bg-white p-4 text-center">
            <img
              src={product.webformatURL}
              alt={product.tags}
              className="w-full h-60 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-4">{product.tags}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
