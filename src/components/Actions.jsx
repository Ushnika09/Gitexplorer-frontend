import React, { useState } from 'react'
import { IoMdTrendingUp } from "react-icons/io";
import { FiGithub } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import Filters from './Filters';


function Actions() {
    const [active,setActive]=useState("trend")
  return (
    <div className='py-5 pb-8 px-5 flex flex-col'>
        <div className='flex justify-center items-center gap-x-8 gap-y-3 md:gap-8 py-1  px-3.5  md:flex-row rounded-3xl mx-auto font-semibold flex-wrap md:flex-nowrap'>
            <button className={`flex gap-1 md:py-3 md:px-10 px-3 text-sm py-1.5 rounded-3xl md:text-xl font-bold border border-purple-300 justify-center items-center trend ${active=="trend"?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} onClick={()=>setActive("trend")}>
                <IoMdTrendingUp/>
                <span className='text-nowrap'>Trending</span>
            </button>

            <button className={`flex gap-1 md:py-3 md:px-10 px-3 text-sm py-1.5 rounded-3xl md:text-xl font-bold border border-purple-300 justify-center items-center repo ${active=="repo"?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} onClick={()=>setActive("repo")}>
                <FiGithub/>
                <span className='text-nowrap'>Search Repos</span>
            </button>

            <button className={`flex gap-1 md:py-3 md:px-10 px-3 text-sm py-1.5 rounded-3xl md:text-xl font-bold border border-purple-300 justify-center items-center user ${active=="user"?"bg-purple-500 text-white hover:bg-purple-500/70":"bg-purple-100/60 hover:bg-purple-200"}`} onClick={()=>setActive("user")}>
                <LuUsers/>
                <span className='text-nowrap'>Search Users</span>
            </button>
        </div>
        <Filters active={active}/>
    </div>
  )
}

export default Actions