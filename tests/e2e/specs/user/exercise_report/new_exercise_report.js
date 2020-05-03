function login(browser, email){
  return browser
    .url('http://localhost:8080/')
    .waitForElementVisible('#login-form')
    .setValue('#email', email)
    .setValue('#password', '123123')
    .click('#btn-login')
    .waitForElementVisible('#user-navbar')
    .waitForElementVisible('#btn-start-exercise')
    .click('#btn-start-exercise')
    .waitForElementVisible('#series-1')
}

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'when user doesnt have a training routine in progress it is expected to render a modal asking him to create one': browser => {
    login(browser, 'exercise@report.com')
    browser
      .clearValue('#series-1')
      .setValue('#series-1', 7.5)
      .clearValue('#series-2')
      .setValue('#series-2', 10)
      .clearValue('#series-3')
      .setValue('#series-3', 15.5)
      .click('#btn-save')
      .waitForElementVisible('#btn-finish-workout')
      .assert.visible('#btn-finish-workout')
      .assert.urlContains('/progress')
      .end()
  },
  'user finish workout' : browser => {
    login(browser, 'finish@workout.report')
    browser
      .clearValue('#series-1')
      .setValue('#series-1', 7.5)
      .clearValue('#series-2')
      .setValue('#series-2', 10)
      .clearValue('#series-3')
      .setValue('#series-3', 15.5)
      .click('#btn-save')
      .waitForElementVisible('#btn-finish-workout')
      .click('#btn-finish-workout')
      .waitForElementVisible('.workout-card')
      .assert.visible('.workout-card')
      .assert.urlContains('/home/user')
      .end()
  },
}
