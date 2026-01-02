import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='pt-20 flex-grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout