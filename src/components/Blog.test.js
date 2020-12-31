import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Joku'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'Joku'
  )
})

test('Renders hidden content', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'joku',
      url: 'www.testi.fi',
      likes: 0
    }
  
    const component = render(
      <Blog blog={blog} />
    )
    
    const likes = component.container.querySelector('p')
  
    expect(component.container).toHaveTextContent('www.testi.fi', )
    expect(likes).toHaveTextContent('Likes 0')
  })

  test('When like button is pressed twice add 2 likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'joku',
        url: 'www.testi.fi',
        likes: 0
      }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} addLikes={mockHandler} />
    )
  
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })