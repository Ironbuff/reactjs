import React from "react";
import Card from "../components/card/Card";
const Home = () => {
  const carditems = [
    {
      id: 1,
      username: "YAK",
      image:
        "https://cdn.pixabay.com/photo/2024/08/15/19/19/highland-cow-8972000_1280.jpg",
    },
    {
      id: 2,
      username: "DONKEY",
      image:
        "https://cdn.pixabay.com/photo/2024/12/20/14/08/donkey-9280208_1280.jpg",
    },
    {
      id: 2,
      username: "YETI",
      image:
        "https://cdn.pixabay.com/photo/2024/08/17/14/15/ai-generated-8975932_960_720.png",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-10 px-28 py-8">
        {carditems.map((item) => (
          <Card img={item.image} username={item.username} desc={item.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
