var faker = require('faker')

module.exports = {
  beforeEach : browser => {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#login-form')
  },
  'correct admin login': browser => {
    browser
      .setValue('#email', 'user@user.com')
      .setValue('#password', '123123')
      .click('#btn-login')
      .assert.elementPresent('#user-navbar')
      .assert.urlContains('home/user')
      .end()
  },
  'wrong admin login': browser => {
    browser
      .setValue('#email', faker.internet.email())
      .setValue('#password', faker.internet.password())
      .click('#btn-login')
      .assert.visible('#error-message')
      .end()
  },
  'try access home/admin without logged in' : browser => {
    browser
      .url('http://localhost:8080/#/home/user')
      .waitForElementVisible('#login-form')
      .assert.urlContains('home')
      .end()
  }
}