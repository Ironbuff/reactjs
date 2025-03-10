import React from 'react'

const Contact = () => {
  return (
    <div className='flex flex-col items-center h-[53vh]'>
        <form className='flex flex-col items-center'>
            {/* User Name */}
            <div className='flex flex-row items-center gap-3'>
            <input type='text' placeholder='First Name' className='border-2 px-3 outline-none'/>
            <input type='text' placeholder='Last Name' className='border-2 px-3 outline-none'/>
            </div>
            {/* Ratings */}
            <div className='flex justify-items-start flex-row gap-4 py-3'>
                <label for="Best">Best</label>    
                <input type='radio' name='review'>
                </input>
                <label for="Worst">Worst</label>
                <input type='radio' name='review'></input>
            </div>
            {/* Message Box */}
            <div className='flex py-3'>
               
                <textarea placeholder='Message' className='px-3 border-2 w-[100%]'>
                </textarea>
            </div>
            <div>
                <button className='border-2 border-amber-50 px-4 py-4 rounded-full bg-neutral-700'>
                    Submit 
                </button>
            </div>
        </form>
    </div>
  )
}

export default Contact