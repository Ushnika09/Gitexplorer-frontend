import React from 'react'
import BookmarkAnalytics from './BookmarkAnalytics'
import LanguageDistribution from './LanguageDistribution'
import Bookmark from './Bookmark'

function Bookmarkdetails() {
  return (
    <div>
      <BookmarkAnalytics/>
      <LanguageDistribution/>
      <Bookmark/>
    </div>
  )
}

export default Bookmarkdetails