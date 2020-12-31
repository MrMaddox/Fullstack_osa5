import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, addLikes }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const deleteBlogFunction = (event) => {
    event.preventDefault()
    
    deleteBlog(blog)
  }

  const addLikesFunction = (event) => {
    event.preventDefault()

    addLikes(blog)
  }

  const allInfo = () => {
    return (
    <div>   
      <div>
        {blog.url}
        <p id='like'>Likes {blog.likes}</p>
        <button onClick={addLikesFunction}>Like</button>
      </div>
      <div>
        <button onClick={deleteBlogFunction}>remove</button>
      </div>
    </div>
    )
  }
  return (
  <div className='oneBlog'>
    <li className='blog'>
    {blog.title} {blog.author} 
    </li>
    <div style={hideWhenVisible}>
      <button id='view' onClick={() => setBlogVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
      {allInfo()}
      <button onClick={() => setBlogVisible(false)}>hide</button>
    </div>
  </div>
  )
}

export default Blog
