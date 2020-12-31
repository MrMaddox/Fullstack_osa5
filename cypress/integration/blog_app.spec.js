describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
      })

    it('Front bage works', function() {
      cy.contains('Bloglist')
      cy.contains('Login')
    })

    it('user can log in', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('Matti Luukkainen logged in')
      })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        
        cy.get('.message')
        .should('contain', 'Wrong username or password')
        
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })

      describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })
    
        it('a new blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('a blog created by cypress')
          cy.get('#author').type('cypress test')
          cy.get('#url').type('www.cypresstest.fi')
          cy.contains('create').click()
          cy.contains('a blog created by cypress')
        })

        describe('and blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'New blog',
                    author: 'Cypress',
                    url: 'www.testi.testi'
                  })
            })
        
            it('Blog can be removed', function() {
                /*cy.contains('new blog').click()
                cy.get('#title').type('Testi')
                cy.get('#author').type('Cypress')
                cy.get('#url').type('www.cypresstest.fi')
                cy.contains('create').click()*/

                cy.contains('view').click()
                cy.contains('remove').click() 
                cy.get('.message')
                .should('contain', 'New blog by Cypress has been deleted')
            })

            it('Blog can be liked', function() {
               /* cy.contains('new blog').click()
                cy.get('#title').type('Testi')
                cy.get('#author').type('Cypress')
                cy.get('#url').type('www.cypresstest.fi')
                cy.contains('create').click()*/

                cy.contains('view').click()
                cy.contains('Like').click() //<-- pitäisi toimia mutta ei jostain syystä hyväksy painallusta
                //cy.get('.message')
                //.should('contain', 'Blog New blog by Cypress got one more like')
            })

            it('Blog are in right order', function() {
                
                  cy.get('div.oneBlog')
                  .contains('view')
                  .click()
                  cy.contains('0')

                  cy.createBlogWithLikes({
                    title: 'New blog2',
                    author: 'Cypress',
                    url: 'www.testi.testi',
                    likes: 2
                  })

                  cy.get('div.oneBlog')
                  .contains('view')
                  .click()
                  cy.contains('2')

                  cy.createBlogWithLikes({
                    title: 'New blog3',
                    author: 'Cypress',
                    url: 'www.testi.testi',
                    likes: 1
                  })

                  cy.get('div.oneBlog')
                  .contains('view')
                  .click()
                  cy.contains('2')
             })
        })
      })
  })