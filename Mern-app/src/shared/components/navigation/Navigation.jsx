import React from 'react'
import Mainheader from './Mainheader'
import Navlinks from './Navlinks'
const Navigation = (props) => {
  return (
    <Mainheader>
        <button>
            <span/>
            <span/>
            <span/>
        </button>
        <h1 className='text-2xl text-neutral-100 font-bold flex justify-start'> Your Places</h1>
        <nav>
          <Navlinks/>
        </nav>
    </Mainheader>
  )
}

export default Navigation