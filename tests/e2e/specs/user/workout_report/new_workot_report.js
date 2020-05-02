function login(browser, email){
  return browser
    .url('http://localhost:8080/')
    .waitForElementVisible('#login-form')
    .setValue('#email', email)
    .setValue('#password', '123123')
    .click('#btn-login')
    .waitForElementVisible('#user-navbar')
}

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'when click on workout-card is expected to be redirected to workout page, where user can start this workout': browser => {
    login(browser, 'user@start.workout')
    browser
      .waitForElementVisible('.workout-card')
      .assert.visible('.workout-card')
      .click('.workout-card')
      .assert.urlContains('user/workouts/')
      .end()
  },
  'create a new workout_report report': browser => {
    login(browser, 'start@workout.com')
    browser
      .click('.workout-card')
      .waitForElementVisible('#btn-start-workout')
      .click('#btn-start-workout')
      .assert.urlContains('/progress')
      .end()
  },
  'user is redirected to workout in progress when redirected to home' : browser => {
    login(browser, 'workout@in.progress')
    browser
      .waitForElementVisible('#workout-progress-view')
      .assert.urlContains('/progress')
      .end()
  }
}
