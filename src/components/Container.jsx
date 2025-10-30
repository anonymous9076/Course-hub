import React from 'react'

const Container = ({children}) => {
  return (
    <>
    <div className='w-full py-4  flex justify-center h-fit'>
    <div className='h-full w-full px-4 lg:px-0  max-w-screen-xl text-default '>{children}</div>
    </div>
    </>
  )
}

export default Container