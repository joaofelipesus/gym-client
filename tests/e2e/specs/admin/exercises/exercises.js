var Login  = require('../../../support/login')

module.exports = {

  before : function (browser) {
    browser.resizeWindow(1200, 1024);
  },
  beforeEach : function (browser){
    Login.as_admin(browser)
          .click('#exercises-dropdown')
          .click('#exercises')    
  },
  'navigate to new exercise view': browser => {
    browser
      .assert.urlContains('/exercises')
      .end()
  },
  'it is expected to have .exercise elements' : browser => {
    browser
      .assert.visible('.exercise')
      .end()
  },
  'it is expected to render .index-buttons' : browser => {
    browser
      .assert.visible('.index-button')
      .end()
  }

}