import React from 'react'
import Hero from '../components/Hero'
import Actions from '../components/Actions'
import useLocalStorage from '../../utils/Helperbookmark';


function Home() {
 const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  return (
    <div>
        <Hero bookmarks={bookmarks}/>
        <Actions />
    </div>
  )
}

export default Home