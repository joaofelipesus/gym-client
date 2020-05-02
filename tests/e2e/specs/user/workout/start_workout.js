function login(browser){
  return browser
              .url('http://localhost:8080/')
              .waitForElementVisible('#login-form')
              .setValue('#email', 'without@training.routine')
              .setValue('#password', '123123')
              .click('#btn-login')
              .waitForElementVisible('#user-navbar')
}

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'when click on workout-card is expected to be redirected to workout page, where user can start this workout': browser => {
    login(browser)
    browser
      .assert.visible('#new-training-routine-modal')
      .assert.visible('#new-training-routine')
      .end()
  },
  /*'close modal when click in close button' : browser => {
    login_user_without_training_routine(browser)
    browser
      .assert.visible('.delete')
      .click('.delete')
      .assert.not.visible('#new-training-routine-modal')
      .end()
  },
  'expect that modal doesnt render when user has a training routine in progress' : browser => {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#login-form')
      .setValue('#email', 'with@training.routine')
      .setValue('#password', '123123')
      .click('#btn-login')
      .waitForElementVisible('#user-navbar')
      .assert.not.visible('#new-training-routine-modal')
  }*/
}
