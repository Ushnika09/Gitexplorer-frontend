import React from 'react'
import { BsGithub } from 'react-icons/bs'

function RepoAction() {
  return (
    <div className='flex-col mt-5 flex items-center gap-2 justify-center w-full bg-white shadow px-5 py-5 transition-all duration-300 rounded-2xl'>
            <BsGithub className='text-7xl text-purple-700 mt-8'/>
            <h1 className='text-center font-semibold  text-xl text-gray-700/60'>Start exploring</h1>
            <h1 className='text-center font-semibold text-xl text-gray-700/60 mb-5'>Enter a search term or apply filters to discover repositories.</h1>
          </div>
  )
}

export default RepoAction