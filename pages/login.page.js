'use strict';

class Login {

    get imgLogo() { return $("a[href='index.html']>img") }
    get lblLoginHeading() { return  $("h4.auth-header") }
    get lblUsername() { return  $("div.form-group:first-child>label") }
    get lblPassword() { return  $("div.form-group:nth-child(2)>label") }
    get txtUsername() { return  $('#username') }
    get txtPassword() { return  $('#password') }
    get imgUsername() { return  $('div.os-icon-user-male-circle') }
    get imgPassword() { return  $('div.os-icon-fingerprint') }
    get btnLogin() { return  $('#log-in') }
    get chkRememberMe() { return  $("input.form-check-input") }
    get imgTwitter(){ return  $("img[src='img/social-icons/twitter.png']") }
    get imgFacebook() { return  $("img[src='img/social-icons/facebook.png']") }
    get imgLinkedin() { return  $("img[src='img/social-icons/linkedin.png']") }
    get lblAlertWarning() { return  $("div.alert-warning") }


    async enterUsername(text) {
        let el = await this.txtUsername;
        await el.waitForDisplayed(20000)
        await el.setValue(text)
    }


    async enterPassword(text) {
        let el = await this.txtPassword;
        await el.waitForDisplayed(20000)
        await el.setValue(text)
    }


    async clickLoginButton() {
        let el = await this.btnLogin;
        await el.waitForDisplayed(20000);
        await el.click();
    }

}
module.exports = new Login()
