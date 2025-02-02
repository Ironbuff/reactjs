import Form1 from "./components/Form/Form1";
import Form2 from "./components/Foem/Form2";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <div className="w-full flex items-center justify-center py-10 relative">
          {/* Background Image */}
          <div className="w-1/2 aspect-video bg-[url('./assests/map.png')] bg-cover bg-center rounded-xl">
            {/* content */}
            <div className="w-full h-full relative z-20 p-6">
              <Form1/>
              <Form2/>

             
              
            </div>
          </div>
          {/* Overlay */}
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/2 aspect-video bg-black opacity-60 rounded-xl z-10"></div>
        </div>
        {/* <br /> <br /> <br /> <br /> <br /> <br /> */}
        {/* Examples */}
        {/* <div className="w-full flex items-center justify-center py-10 relative"> */}
        {/* Backgroun img */}
        {/* <div className="w-1/2 aspect-video bg-[url('./assests/map.png')] bg-cover bg-center rounded-xl">
            <div className="w-full h-full relative z-20 p-6 bg-indigo-500">
              sdlkfdklshkl
              <h1 className="text-red-500 text-xl">Hello there</h1>
            </div>
          </div> */}
        {/* Overlay */}
        {/* <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/2 aspect-video bg-black opacity-60 rounded-xl z-10"></div>
          </div>
        </div> */}
      </Router>
    </>
  );
}

export default App;
