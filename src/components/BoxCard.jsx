import React from 'react'
import {Link} from 'react-router-dom'
const BoxCard = ({item}) => {

  return (
    <div className='w-fit '>
        <Link to={`/courses/${item.name}`} className='block no-underline hover:bg-[#5AB2FF]/70 py-5 px-10 rounded-lg text-white shadow-lg  bg-[#5AB2FF] w-full'>
        {item.name}
        </Link>
    </div>
  )
}

export default BoxCard