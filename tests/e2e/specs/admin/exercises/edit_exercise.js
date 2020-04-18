var Login  = require('../../../support/login')
var faker = require('faker')

module.exports = {

  before : function (browser) {
    browser.resizeWindow(1200, 1024);
  },
  beforeEach : function (browser){
    Login.as_admin(browser)
          .click('#exercises-dropdown')
          .click('#exercises')
          .waitForElementVisible('#exercises-list')
          .click('.edit-exercise')
          .waitForElementVisible('#edit-exercise-form')
  },
  'navigate to new exercise view': browser => {
    browser
      .assert.urlContains('/exercises/')
      .end()
  },
  'update exercise' : browser => {
    browser  
      .clearValue('#name')
      .setValue('#name', faker.internet.ipv6())
      .click('#btn-save')
      .waitForElementVisible('#success-message')
      .assert.elementPresent('#success-message')
      .assert.urlContains('home/admin')
      .end()
  },
  'when duplucated names' : browser => {
    let name = faker.internet.ipv6()
    browser
      .clearValue('#name')
      .setValue('#name', name)
      .click('#btn-save')
      .waitForElementVisible('#admin-navbar')
      .click('#exercises-dropdown')
      .click('#exercises')
      .waitForElementVisible('#exercises-list')
      .click('.edit-exercise')
      .waitForElementVisible('#edit-exercise-form')
      .clearValue('#name')
      .setValue('#name', name)
      .click('#btn-save')
      .waitForElementVisible('#error-message')
      .assert.containsText('#error-message', "Nome já está em uso")
      .end()  
  }

}