import React, { useState } from 'react'
import Trend from './Trend';
import Repos from './Repos';
import User from './User';

function Filters({active}) {
    

  return (
    <div className='my-7 mx-auto w-full'> 
    {
        (active=="trend") ? <Trend/> : (active=="repo") ? <Repos/> : <User/>
    }

    </div>
  )
}

export default Filters