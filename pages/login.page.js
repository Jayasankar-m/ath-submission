'use strict';

class Login {
    get imgLogo() { return $("a[href='index.html']>img") }
    get lblLoginHeading() { return $("h4.auth-header") }
    get lblUsername() { return $("div.form-group:first-child>label") }
    get lblPassword() { return $("div.form-group:nth-child(2)>label") }
    get txtUsername() { return $('#username') }
    get txtPassword() { return $('#password') }
    get imgUsername() { return $('div.os-icon-user-male-circle') }
    get imgPassword() { return $('div.os-icon-fingerprint') }
    get btnLogin() { return $('#log-in') }
    get chkRememberMe() { return $("input.form-check-input:not([style])") }
    get imgTwitter(){ return $("img[src='img/social-icons/twitter.png']") }
    get imgFacebook() { return $("img[src='img/social-icons/facebook.png']") }
    get imgLinkedin() { return $("img[src='img/social-icons/linkedin.png']") }


    /**
     * Enter the username into the field
     * @param {String} text username to be entered
     */
    enterUsername(text) {
        this.txtUsername.waitForDisplayed()
        this.txtUsername.setValue(text)
    }

    /**
     * Enter the password into the field
     * @param {String} text password to be entered
     */
    enterPassword(text) {
        this.txtPassword.waitForDisplayed()
        this.txtPassword.setValue(text)
    }

    /**
     * Click login button
     */
    clickLoginButton() {
        this.btnLogin.waitForDisplayed()
        this.btnLogin.click()
    }

}
module.exports = new Login()
