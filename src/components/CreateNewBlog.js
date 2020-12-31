import React, { useState } from 'react'

  const NewBlogForm = ({ addBlog }) => {
    const [ newTitle, setNewTitle ] = useState('')
    const [ newAuthor, setNewAuthor ] = useState('')
    const [ newUrl2, setNewUrl2 ] = useState('')

    const handleTitleChange = (event) => {
      setNewTitle(event.target.value)
    }
  
    const handleNewUrl = (event) => {
      setNewUrl2(event.target.value)
    }
  
    const handleAuthorChange = (event) => {
      setNewAuthor(event.target.value)
    }

    const addBlogFunction = (event) => {
      event.preventDefault()

      const blogObject = {
        title: newTitle,
          author: newAuthor,
          url: newUrl2,
      }
      addBlog({ blogObject })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl2('')
    }

    return (
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={addBlogFunction}>
          <div>
            title: <input
            id='title' 
            value={newTitle}
            onChange={handleTitleChange}
           />
          </div>
          <div>
           author: <input 
            id='author'
            value={newAuthor}
           onChange={handleAuthorChange}/>
          </div>
          <div>
           url: <input 
            id='url'
            value={newUrl2}
            onChange={handleNewUrl}/>
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    )
  }

export default NewBlogForm