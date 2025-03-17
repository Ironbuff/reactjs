import React from 'react'

const Laptop = () => {
  return (
    <div className='flex flex-row px-7 py-7'>
        <div>
            <img src='https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg' className='object-fit w-[50%] h-45'/>
            
        </div>
        <div>
            <div>
            <h1>Laptop</h1>
            <p>This is one and only item present</p>
            <button>
                Purchase 
            </button>
            <button>
                Price: Rs 300
            </button>
            <div>
                <p>Category:<span> First Hand Laptop </span></p>
                <p>Model:<span> Asus Gaming Laptop </span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Laptop