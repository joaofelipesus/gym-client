function login_user_with_training_routine(browser){
  return browser
              .url('http://localhost:8080/')
              .waitForElementVisible('#login-form')
              .setValue('#email', 'with@training.routine')
              .setValue('#password', '123123')
              .click('#btn-login')
              .waitForElementVisible('#user-navbar')
}

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'when user has training_routine but hasnt any workouts': browser => {
    login_user_with_training_routine(browser)
    browser
      .assert.visible('#without-workout-modal')
      .end()
  },
  'closing modal click delete button': browser => {
    login_user_with_training_routine(browser)
    browser
      .waitForElementVisible('#without-workout-modal')
      .assert.visible('#close-without-workout-modal')
      .click('#close-without-workout-modal')
      .assert.not.visible('#without-workout-modal')
      .end()
  },
  'doesnt render modal when user has workouts' : browser => {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#login-form')
      .setValue('#email', 'with@workout.com')
      .setValue('#password', '123123')
      .click('#btn-login')
      .waitForElementVisible('#user-navbar')
      .assert.not.visible('#without-workout-modal')
      .end()
  },
  'close modal after click in new workout button' : browser => {
    login_user_with_training_routine(browser)
    browser
      .waitForElementVisible('#without-workout-modal')
      .assert.visible('#new-workout-button')
      .click('#new-workout-button')
      .assert.urlContains('/workouts/new')
      .end()
  }
}
