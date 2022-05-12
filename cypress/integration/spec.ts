describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/posts');
    cy.contains('Reddint');
  })
})


describe('Login Test', () => {
  it('redirect to posts', () => {
    cy.visit('/posts')
    cy.get('a[name="login"]').first().click();
    cy.get('input[name="email"]').type('claudiokk@email.com');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button').first().click();
    cy.visit('/posts')
  })
})

describe('Sign up', () => {
  it('sign up a new user', () => {
    cy.visit('/posts')
    cy.get('a[name="signup"]').first().click();
    cy.get('input[name="username"]').type('claudiohl2001')
    cy.get('input[name="email"]').type('claudio2@email.com');
    cy.get('input[name="password"]').type('12345678');
    cy.get('input[name="confirm"]').type('12345678');
    cy.get('button').first().click();
    cy.visit('/posts');
  })
})
