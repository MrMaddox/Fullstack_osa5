import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './CreateNewBlog'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
  
    const component = render(
      <NewBlogForm addBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, { 
      target: { value: 'Testaaja' } 
    })
    fireEvent.change(title, { 
        target: { value: 'Testataan toimiiko' } 
      })
      fireEvent.change(url, { 
        target: { value: 'www.testi.fi' } 
      })

    fireEvent.submit(form)
    //console.log(createBlog.mock.calls[0][0].blogObject.title)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].blogObject.author).toBe('Testaaja')
    expect(createBlog.mock.calls[0][0].blogObject.title).toBe('Testataan toimiiko')
    expect(createBlog.mock.calls[0][0].blogObject.url).toBe('www.testi.fi')
  })

