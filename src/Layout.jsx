import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='pt-20'>
    <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Layout