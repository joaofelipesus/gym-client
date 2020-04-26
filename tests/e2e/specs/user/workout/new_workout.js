function login_user_with_training_routine(browser, email){
    return browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#login-form')
      .setValue('#email', email)
      .setValue('#password', '123123')
      .click('#btn-login')
      .waitForElementVisible('#user-navbar')
      .assert.visible('#without-workout-modal')
      .click('#new-workout-button')
      .waitForElementVisible("#new-workout-form")
}

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'create a new workout': browser => {
    login_user_with_training_routine(browser, 'without@workout.com')
    browser
      .setValue('#name', 'Perna')
      .setValue('#classes-to-attend', 12)
      .setValue('#repetitions', 15)
      .setValue('#rest-time', 40)
      .setValue('#series-number', 4)
      .click('#btn-add-exercise')
      .click('#btn-save')
      .waitForElementVisible('#new-workout-modal')
      .assert.visible('#new-workout-modal')
      .end()
  },
  'expect to render error message when two workouts has same name': browser => {
    login_user_with_training_routine(browser, 'with@duplicated.workout')
    browser
      .setValue('#name', 'Perna')
      .setValue('#classes-to-attend', 12)
      .setValue('#repetitions', 15)
      .setValue('#rest-time', 40)
      .setValue('#series-number', 3)
      .click('#btn-add-exercise')
      .click('#btn-save')
      .waitForElementVisible('#new-workout-modal')
      .click('#btn-new-workout')
      .waitForElementVisible('#name')
      .setValue('#name', 'Perna')
      .setValue('#classes-to-attend', 12)
      .setValue('#repetitions', 15)
      .setValue('#rest-time', 40)
      .setValue('#series-number', 4)
      .click('#btn-add-exercise')
      .click('#btn-save')
      .waitForElementVisible('#error-message')
      .assert.visible('#error-message')
      .assert.containsText('#error-message', "Nome já está em uso para esta rotina de treinos")
      .end()
  },
  'remove exercise added' : browser => {
    login_user_with_training_routine(browser, 'with@training.routine')
    browser
      .setValue('#repetitions', 15)
      .setValue('#rest-time', 40)
      .setValue('#series-number', 3)
      .click('#btn-add-exercise')
      .waitForElementVisible('.exercise-card')
      .click('.exercise')
      .waitForElementVisible('.remove-exercise')
      .click('.remove-exercise')
      .waitForElementNotPresent('.exercise-card') 
      .end()
  },
  'check that two equal exercises cant be added on same workout' : browser => {
    login_user_with_training_routine(browser, 'with@training.routine')
    browser
      .setValue('#repetitions', 15)
      .setValue('#rest-time', 40)
      .setValue('#series-number', 3)
      .click('#btn-add-exercise')
      .waitForElementVisible('.exercise-card')
      .setValue('#repetitions', 10)
      .setValue('#rest-time', 45)
      .setValue('#series-number', 3)
      .click('#btn-add-exercise')
      .waitForElementVisible('#exercise-error-message')
      .assert.containsText('#exercise-error-message', 'O exercício selecionado já está presente neste treino.')
      .end()
  },
}
  