function login(browser){
  return browser
              .url('http://localhost:8080/')
              .waitForElementVisible('#login-form')
              .setValue('#email', 'user@start.workout')
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
      .waitForElementVisible('.workout-card')
      .assert.visible('.workout-card')
      .assert.urlContains('user/workouts/')
      .end()
  },
  'user start a new workout' : browser => {
    login(browser)
    browser
      .waitForElementVisible('.workout-card')
      .click('.workout-card')
      .waitForElementVisible('#btn-start-workout')
      .click('#btn-start-workout')
      .waitForElementVisible('.workout-exercise-card')
      .assert.urlContains('/progress')
      .assert.visible('#btn-start-exercise')
      .end()
  },
}
