import React from 'react';

const products = [
  { id: 1, name: 'Watch', link: 'https://cdn.pixabay.com/photo/2014/07/31/23/00/wristwatch-407096_1280.jpg' },
  { id: 2, name: 'Glass', link: 'https://cdn.pixabay.com/photo/2015/07/28/17/10/safety-glasses-864648_1280.jpg' },
  { id: 3, name: 'Hat', link: 'https://cdn.pixabay.com/photo/2016/12/04/23/22/hat-1882816_1280.jpg' },
];

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
      aria-label={`Product: ${product.name}`}
    >
      <img 
        src={product.link} 
        className="w-full h-40 object-cover rounded-t-lg" 
        alt={product.name} 
        loading="lazy"
      />
      <h2 className="text-lg font-semibold text-center mt-2">{product.name}</h2>
    </div>
  );
};

const Card = () => {
  return (
    <div className="container mx-auto max-w-screen-lg px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Card;
