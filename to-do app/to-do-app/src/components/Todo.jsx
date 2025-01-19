import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
const Todo = (props) => {
  return (
    <div className='px-96 py-3'>
        {/* use for showing to do list item */}
        <li className='list-none border border-blue-800 rounded-lg mt-4 flex justify-between items-center text-2xl font-semibold'>
            {props.item}
            <span className='flex justify-end'>
             <RxCrossCircled onClick={e=>{
            props.deleteitem(props.index)
        }} />
            </span>
        </li>
    </div>
  )
}

export default Todo