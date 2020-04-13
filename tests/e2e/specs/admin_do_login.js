var faker = require('faker')

module.exports = {
  'correct admin login': browser => {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#login-form')
      .setValue('#email', 'admin@admin.com')
      .setValue('#password', '123123')
      .click('#btn-login')
      .assert.elementPresent('#admin-navbar')
      .assert.urlContains('home/admin')
      .end()
  },

  'wrong admin login': browser => {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#login-form')
      .setValue('#email', faker.internet.email())
      .setValue('#password', faker.internet.password())
      .click('#btn-login')
      .assert.visible('#error-message')
      .end()
  },

  'try access home/admin without logged in' : browser => {
    browser
      .url('http://localhost:8080/#/home/admin')
      .waitForElementVisible('#login-form')
      .assert.urlContains('home')
      .end()
  }
}