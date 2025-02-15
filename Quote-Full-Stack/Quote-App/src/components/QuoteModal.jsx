import React, { useEffect, useState } from 'react'

const QuoteModal = ({closeModal, addQuote, currentQuote, editQuote}) => {
  const [title,setTitle]=useState('')
  const [description, setDescription] = useState('')
  
  useEffect(()=>{
    if(currentQuote){
        setTitle(currentQuote.title)
        setDescription(currentQuote.description)
    }
  },[currentQuote])

  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(currentQuote){
       editQuote(currentQuote, title, description)
    }else{
        addQuote(title,description)
    }
   addQuote(title,description)
   };

    return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
        <div className='bg-white p-8 rounded'>
            <h2 className='text-xl font-bold mb-4'>
                {currentQuote ? "Edit Quote" : "Add New Quote"}
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder='Quote Title'
                className='border p-2 w-full mb-4'
                />
                <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='Quote Description'
                className='border p-2 w-full mb-4'
                />
                <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded'>
                  {currentQuote ? "Update Quote": "Add Quote"}
                </button>
            </form>
            <button className='mt-4 text-red-500'onClick={closeModal}>
                Cancel
            </button>
        </div>
    </div>
  )
}

export default QuoteModal