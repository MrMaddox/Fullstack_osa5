import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import NewBlogForm from './components/CreateNewBlog'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = (blogObject) => {
    const result = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)

    if(result === true) {
      blogService
      .erase(blogObject.id)
      .then(deletedBlog => {
        setMessage(
          `${blogObject.title} by ${blogObject.author} has been deleted`
        )
        setTimeout(() => {
          setMessage(null)
          window.location.reload(false)
        }, 5000)
      })
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const blog = {
      title: blogObject.blogObject.title,
      author: blogObject.blogObject.author,
      url: blogObject.blogObject.url,
      userId: user.id
    }

    blogService 
    .create(blog)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.log("TOIMIII")
      console.log(error.response.data)
  })
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    window.location.reload(false);
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>      
  )

  loginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

    const addLikes = (blogObject) => {
     const newLikeAmount = blogObject.likes + 1

      const blog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: newLikeAmount,
        userId: user.id
      }

      blogService
      .update(blogObject.id, blog)
      .then(returnedBlog => {
      setMessage(
        `Blog ${returnedBlog.title} by ${returnedBlog.author} got one more like`
      )
      setTimeout(() => {
        setMessage(null)
        window.location.reload(false)
      }, 5000)
    })
    }

  const blogFormRef = React.createRef()
  
  const newBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlogForm addBlog={addBlog} />
    </Togglable>
  )

  const BlogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLikes={addLikes}/>
      )} 
    </div>
  )

  return (
    <div>
      <h2>Bloglist</h2>
      <Notifications message={message} />

      <h2>Login</h2>

      {user === null 
        ? loginForm()
        : <div>
            <div>
              <p>{user.name} logged in</p>
              <button onClick={handleLogout}>logout</button>
            </div>
            {newBlogForm()}
            {BlogForm()}
          </div>
      }
      
      
    </div>
  )
}

export default App