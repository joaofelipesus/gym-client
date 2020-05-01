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