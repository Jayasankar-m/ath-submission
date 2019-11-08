'use strict';
const loginPage = require("./pages/login.page.js");

describe("Traditional Tests",function(){
    beforeEach(()=>{
        //await browser.url(`${browser.options.baseUrl}`)
        browser.url(`https://demo.applitools.com/hackathon.html`);
    });

    it("Login Page UI Elements Test", ()=>{
        var actual = {};
        var expected = {
            "Logo image visibility": true,
            "Login heading visibility": true
        };
        actual["Logo image visibility"] = loginPage.imgLogo.isDisplayed(),
        actual["Login heading visibility"] = loginPage.lblLoginHeading.isDisplayed();
        assert(expected,actual);

    });
/*
    it("", ()=>{
        
    });

    it("", ()=>{
        
    });

    it("", ()=>{
        
    });

    it("", ()=>{
        
    });
    */
})