import React from 'react'

const Card = () => {
  const Products =[
    {id:1,name:"watch",link:"https://cdn.pixabay.com/photo/2014/07/31/23/00/wristwatch-407096_1280.jpg"},
    {id:2,name:"glass", link:"https://cdn.pixabay.com/photo/2015/07/28/17/10/safety-glasses-864648_1280.jpg"},
    {id:3, name:"hat", link:"https://cdn.pixabay.com/photo/2016/12/04/23/22/hat-1882816_1280.jpg"},
  ]
  return (
    <div>
        <div>
           <div>
            Products Image
            </div>
            <h1>
                Price
            </h1>
        </div>
        
    </div>
  )
}

export default Card