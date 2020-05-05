const login = require('../../../support/login')

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'it is expected to rendr modal to complete workout when click on # button': browser => {
    login.as_user(browser, 'user-with@workout.progress')
    browser
      .waitForElementVisible('#btn-complete-training-routine')
      .click('#btn-complete-training-routine')
      .assert.visible('#btn-complete-training-routine-modal')
      .end()
  },
  'it is expected to close modal when click in #btn-close-complete-training-routine-button' : browser => {
    login.as_user(browser, 'user-with@workout.progress')
    browser
      .waitForElementVisible('#btn-complete-training-routine')
      .click('#btn-complete-training-routine')
      .waitForElementVisible('#btn-close-complete-training-routine-button')
      .click('#btn-close-complete-training-routine-button')
      .assert.not.visible('#btn-complete-training-routine-modal')
      .end()
  },
  'it is expected to render new workout modal after click button #btn-complete-training-routine' : browser => {
    login.as_user(browser, 'complete@other-training.routine')
    browser
      .waitForElementVisible('#btn-complete-training-routine')
      .click('#btn-complete-training-routine')
      .waitForElementVisible('#btn-complete')
      .click('#btn-complete')
      .waitForElementVisible('#new-training-routine-modal')
      .assert.visible('#new-training-routine-modal')
      .assert.not.visible('#btn-complete-training-routine-modal')
      .end()
  }
}
