var Login  = require('../../../support/login')
var faker = require('faker')

module.exports = {

  beforeEach : function (browser){
    Login.as_admin(browser)
      .resizeWindow(1200, 1024)
      .click('#exercises-dropdown')
      .click('#new-exercise')
      .waitForElementVisible('#new-exercise-view')
      .waitForElementVisible('#name')
  },
  'navigate to new exercise view': browser => {
    browser
      .assert.urlContains('/exercises/new')
      .end()
  },
  'create new exercise' : browser => {
    browser  
      .setValue('#name', faker.internet.ipv6())
      .click('#btn-save')
      .waitForElementVisible('#success-message')
      .assert.elementPresent('#success-message')
      .assert.urlContains('home/admin')
      .end()
  },
  'when duplucated names' : browser => {
    let name = 'Azuka Langley'
    browser
      .setValue('#name', name)
      .click('#btn-save')
      .waitForElementVisible('#admin-navbar')
      .waitForElementVisible('#exercises-dropdown')
      .click('#exercises-dropdown')
      .click('#new-exercise')
      .waitForElementVisible('#new-exercise-view')
      .setValue('#name', name)
      .click('#btn-save')
      .waitForElementVisible('#error-message')
      .assert.containsText('#error-message', "Nome já está em uso")
      .end()  
  }

}