import React from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
  <>
 <div className='flex space-x-8 px-10 border items-center py-4'>

 <img className='md:w-[80px] w-[50px]' src={logo}></img>
  <Link to='/' className='text-blue-400 font-bold md:text-3xl text-xl'>Movies</Link>
  <Link to='/favourites'className='text-blue-400 font-bold md:text-3xl text-xl'>Favourite</Link>
 </div>
  
  
  </>
  )
}

export default NavBar