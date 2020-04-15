var Login  = require('../../../support/login')

module.exports = {
  'correct admin login': browser => {
    Login.as_admin(browser)
      .end()
  },

}