import React from 'react'

const Card = ({img, username, desc}) => {
  return (
    <div className='flex flex-row gap-x-4 bg-gray-500/10 border border-gray-500/10 rounded-xl overflow-hidden'>
       
         <div  className='w-full flex flex-col gap-y-4'>
            <div>
                {/* image section of image */}
                <img className='w-full aspect-video object-cover shadow-sm' src={img}/>
            </div>
            <div className='flex flex-col gap-y-1  px-4'>
             {/* username */}
            <h1 className='text-2xl font-bold tracking-wide'>
                {username}
            </h1>
            {/* description */}
        {/* // 9709290353 */}

            <p className='text-base text-justify py-4'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt placeat commodi inventore ipsam? Cumque maxime omnis pariatur cum expedita sapiente dolore, a tempora temporibus laborum iure nam iusto incidunt velit.
            </p>
            </div>
         </div>
    </div>
  )
}

export default Card