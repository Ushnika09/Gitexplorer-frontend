import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Header/>
        <div class="bg-gradient-to-br from-purple-200/40 via-neutral-100 to-amber-400/30 p-6 min-h-screen mt-[5.3rem]">
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout