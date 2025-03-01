import React from 'react'

const Customer = () => {
  const review =[
    {id:1, text:"The products are easy to filter" ,img:""},
    {id:2, text:"Fast and Reliable Products delivery", img:""},
    {id:3, text:"The Products was quality is same as shown", img:""},
  ]
    return (
    <div>
        {review.map((item)=>(
            <div key={item.id}>
                <div>
                
                </div>
            </div>
        ))}
    </div>
  )
}

export default Customer