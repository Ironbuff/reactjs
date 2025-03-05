import React from 'react';

const Customer = () => {
  const reviews = [
    {
      id: 1,
      name: "Sita",
      text: "The products are easy to filter",
      img: "https://cdn.pixabay.com/photo/2022/11/21/15/32/business-7607360_1280.jpg",
    },
    {
      id: 2,
      name: "Mukesh",
      text: "Fast and Reliable Products delivery",
      img: "https://media.istockphoto.com/id/171372118/photo/outdoor-portrait-of-confident-cheerful-indian-businessman-at-construction-site.jpg?s=2048x2048&w=is&k=20&c=yytZ4En3aJMYXWu3egqMT7gWqqMH6GMwjb0IRRQwTGw=",
    },
    {
      id: 3,
      name: "Ram",
      text: "The product quality is the same as shown",
      img: "https://media.istockphoto.com/id/596082270/photo/smiling-friendly-asian-businessman.jpg?s=2048x2048&w=is&k=20&c=gvVZkLaR6_yqhDY3xjnzJ73hJC_VybBkFlzr3LTzAgY=",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto">
      <h1 className='flex justify-center text-3xl font-bold text-gray-800'>Customer Reviews</h1>
      {reviews.map((item) => (
        <div key={item.id} className="flex flex-row items-center gap-6 border-b pb-4">
          <img
            src={item.img}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-full"
          />
          <div>
            <h1 className="text-lg font-bold">{item.name}</h1>
            <p className="text-gray-700">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customer;
