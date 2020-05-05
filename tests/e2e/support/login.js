module.exports = {

  as_admin(browser){
    return browser
            .url('http://localhost:8080/')
            .waitForElementVisible('#login-form')
            .setValue('#email', 'admin@admin.com')
            .setValue('#password', '123123')
            .click('#btn-login')
            .waitForElementVisible('#admin-navbar')
  },

  as_user(browser, email){
    return browser
              .url('http://localhost:8080/')
              .waitForElementVisible('#login-form')
              .setValue('#email', email)
              .setValue('#password', '123123')
              .click('#btn-login')
              .waitForElementVisible('#user-navbar')
  }

}