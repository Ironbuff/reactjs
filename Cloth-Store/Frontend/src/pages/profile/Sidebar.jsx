import React from 'react'

const Sidebar = ({datas}) => {
  
  
  return (
    <div>
         <h1>
          All Settings
         </h1>
         <div>
            {datas.map()}
         </div>
         
    </div>
  )
}

export default Sidebar