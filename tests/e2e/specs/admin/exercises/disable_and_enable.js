var Login  = require('../../../support/login')
var faker = require('faker')

module.exports = {

  before : function (browser) {
    browser.resizeWindow(1200, 1024);
  },
  beforeEach : function (browser){
    Login.as_admin(browser)
          .click('#exercises-dropdown')
          .click('#new-exercise')
          .waitForElementVisible('#new-exercise-view')
          .waitForElementVisible('#name')
          .setValue('#name', faker.internet.ipv6())
          .click('#btn-save')
          .waitForElementVisible('#exercises-dropdown')
          .click('#exercises-dropdown')
          .click('#exercises')
          
          .waitForElementVisible('#exercises-list')
  },
  'it is expected to have disable class': browser => {
    browser
      .assert.visible('.disable')
      .end()
  },
  'is is expected to have enable class after click in disable button' : browser => {
    browser
      .click('.disable')
      .waitForElementVisible('.enable')
      .assert.visible('.enable')
      .end()
  },
  'it is expected to have .disable element after click in enable link' : browser => {
    browser
      .click('.disable')
      .waitForElementVisible('.enable')
      .click('.enable')
      .waitForElementVisible('.disable')
      .assert.visible('.disable')
      .end()
  },
}