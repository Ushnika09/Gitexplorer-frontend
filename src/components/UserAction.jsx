import React from 'react'
import { LuUsers } from 'react-icons/lu'

function UserAction() {
  return (
        <div className='flex-col mt-5 flex items-center gap-3.5 justify-center w-full bg-white shadow px-5 py-5 transition-all duration-300  rounded-2xl'>
        <LuUsers className='text-7xl text-purple-700 mt-8'/>
        <h1 className='text-center font-semibold  text-xl text-gray-700/60'>Find GitHub users</h1>
        <h1 className='text-center font-semibold  text-xl text-gray-700/60 mb-5'>Enter a username to search for GitHub users and explore their profiles.</h1>
      </div>
  )
}

export default UserAction