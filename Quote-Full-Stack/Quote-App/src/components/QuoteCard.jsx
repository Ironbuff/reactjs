import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
const QuoteCard = ({quote, onEdit, deleteQuote}) => {
  return (
    <div className='bg-white p-4 rounded shadow'>
        <h2 className='text-xl font-bold'>
            {quote.title} 
        </h2>
        <p>
            {quote.description}
        </p>
        <div className='flex justify-end mt-2'>
          <button className='text-blue-500 mr-2' onClick={() => onEdit(quote)}>
            <FaEdit />
          </button>
          <button className='text-red-500' onClick={()=> deleteQuote(quote._id)}>
            <FaTrash/>
          </button>
        </div>
    </div>
  );
};

export default QuoteCard