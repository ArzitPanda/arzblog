import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className=" flex h-24 flex-row items-center justify-between mx-auto px-4 mb-6">
   <div className="flex">
      <Link href="/">
          <img className="w-48 object-contain cursor-pointer" src="/arzblog.png" alt="" />


      </Link>
        <div className="hidden md:inline-flex items-center space-x-5 font-semibold">
          <h3>About</h3>
          <h3>contact</h3>
          <h3 className="text-white bg-blue-400 py-1 px-3 rounded-full">Follow</h3>
        </div>


   </div>
   <div className="flex items-center space-x-5 text-blue-600">
     <h3>Sign in</h3>
     <h3 className="border px-3 py-1 rounded-full border-blue-600">Get Started</h3>
   </div>
   </div>
  )
}

export default Header