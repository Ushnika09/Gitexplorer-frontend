import React, { useContext } from 'react';
import { BookmarkContext } from '../Context/BookmarkProvider';
import Hero from '../components/Hero';
import Actions from '../components/Actions';

function Home() {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <div>
      <Hero bookmarks={bookmarks}/>
      <Actions />
    </div>
  )
}

export default Home;