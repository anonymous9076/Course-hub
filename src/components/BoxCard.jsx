import React from 'react'
import {Link} from 'react-router-dom'
const BoxCard = ({label='Web Designing',path='/courses/web-designing'}) => {

  return (
    <div className='w-fit '>
        <Link to={path} className='block no-underline hover:bg-[#5AB2FF]/70 py-5 px-10 rounded-lg !text-white shadow-lg  bg-[#5AB2FF] w-[100%]'>
        {label}
        </Link>
    </div>
  )
}

export default BoxCard