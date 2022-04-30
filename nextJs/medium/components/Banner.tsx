import React from 'react'

const Banner = () => {
  return (
    <div className="flex justify-between items-center bg-blue-400 border-y border-black py-20 px-8 lg:py-0">

          <div className="px-5 lg:px-10 space-y-5">
            <h1 className="text-3xl md:text-6xl max-width-xl font-serif"> <span className="underline decoration-black decoration-4">ArzBlog</span> is a place to read,write,connect</h1>
            <h2>It's easy and free to post Your Thinking on any topic and connect with millions of reader</h2>
          </div>
          <img className="hidden md:inline-flex h-32 lg:h-full"src="/tent.png" alt=""/>

      </div>
  )
}

export default Banner
