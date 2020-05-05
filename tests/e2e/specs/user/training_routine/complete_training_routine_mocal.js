const login = require('../../../support/login')

module.exports = {
  beforeEach : browser => {
    browser.resizeWindow(500, 800);
  },
  'it is expected to not render complete_training_routine_modal when user has not finish all woirkouts': browser => {
    login.as_user(browser, 'with-progress@training.routine')
    browser
      .assert.not.visible('#complete-training-routine-modal')
      .end()
  },
  'it is expected to render complete_training_routine_modal when all workouts reach workouts.classes_to_attend' : browser => {
    login.as_user(browser, 'with@ll-workouts.complete')
    browser
      .assert.visible('#complete-training-routine-modal')
      .end()
  },
  'it is expected to close modal after click in close button' : browser => {
    login.as_user(browser, 'with@ll-workouts.complete')
    browser
        .assert.visible('#complete-training-routine-modal')
        .waitForElementVisible('#close-complete-training-modal')
        .click('#close-complete-training-modal')
        .assert.not.visible('#complete-training-routine-modal')
        .end()
  },
  'it is expected to render new workout modal after click in button complete training routine' : browser => {
    login.as_user(browser, "complete@training.routine")
    browser
      .waitForElementVisible('#complete-training-routine')
      .click('#complete-training-routine')
      .waitForElementVisible('#new-training-routine-modal')
      .assert.visible('#new-training-routine-modal')
      .end()
  }
  
}
