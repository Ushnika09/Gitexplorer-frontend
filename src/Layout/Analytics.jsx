import React from 'react'
import { HiOutlineRefresh } from "react-icons/hi";
import AnalyticsDetails from '../components/AnalyticsDetails';

function Analytics() {
  return (
    <div className="flex flex-col justify-center my-7 mx-5">
      <h1 className='md:text-4xl text-2xl font-bold'>Analytics Dashboard</h1>
      {/* Refresh */}
      <div className='flex items-center justify-between gap-5'>
        <h1 className='font-medium text-gray-600/80 text-wrap text-[0.7rem] md:text-xl'>Comprehensive insights into GitHub repository trends and your bookmarks</h1>
        
      </div>
      <AnalyticsDetails/>
    </div>
  )
}

export default Analytics