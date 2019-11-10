'use strict';
var loginPage = require("./pages/login.page.js");
var homePage = require("./pages/home.page.js");
var expensesPage = require("./pages/expenses.page.js");
var TestManager = require("./utility/testmanager");
var testManager;
const LOGINDATA = require("./data/logindata.json");

describe("Traditional Tests", function() {

    before(function() {
        var APP_VERSION = process.env.APP_VERSION;
        if(!APP_VERSION){
            APP_VERSION = "v2"
        }
        testManager = new TestManager(`TestResults_${APP_VERSION}.csv`);
    });

    it("Login Page UI Elements Test", async function() {
        testManager.startTest();
        await browser.url(browser.options.baseUrl);
        await browser.maximizeWindow();
        let imgLogo = await loginPage.imgLogo;
        let lblLoginHeading = await loginPage.lblLoginHeading;
        let lblUsername = await loginPage.lblUsername;
        let lblPassword = await loginPage.lblPassword;
        let txtUsername = await loginPage.txtUsername;
        let txtPassword = await loginPage.txtPassword;
        let imgUsername = await loginPage.imgUsername;
        let imgPassword = await loginPage.imgPassword;
        let btnLogin = await loginPage.btnLogin;
        let chkRememberMe = await loginPage.chkRememberMe;
        let imgTwitter = await loginPage.imgTwitter;
        let imgFacebook = await loginPage.imgFacebook;
        let imgLinkedin = await loginPage.imgLinkedin;
        let txt;
        testManager.checkPoint(this.test.title, "Image Logo visibility", await imgLogo.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Heading Login visibility", await lblLoginHeading.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Heading Login text", (txt = await lblLoginHeading.getText(), txt.trim()), "Login Form");
        testManager.checkPoint(this.test.title, "Label Username visibility", await lblUsername.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Label Password visibility", await lblPassword.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Label Username Text", await lblUsername.getText(), "Username");
        testManager.checkPoint(this.test.title, "Label Password Text", await lblPassword.getText(), "Password");
        testManager.checkPoint(this.test.title, "Textbox Username visibility", await txtUsername.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Textbox Username placeholder text", await txtUsername.getAttribute("placeholder"), "Enter your username");
        testManager.checkPoint(this.test.title, "Textbox Password visibility", await txtPassword.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Textbox Password placeholder text", await txtPassword.getAttribute("placeholder"), "Enter your password");
        testManager.checkPoint(this.test.title, "Image Username visibility", await imgUsername.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Image Password visibility", await imgPassword.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Button Login visibility", await btnLogin.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Checkbox RememberMe visibility", await chkRememberMe.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Checkbox RememberMe alignment", await chkRememberMe.getAttribute("style"), "");
        testManager.checkPoint(this.test.title, "Image Twitter visibility", await imgTwitter.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Image Facebook visibility", await imgFacebook.isDisplayed(), true);
        testManager.checkPoint(this.test.title, "Image Linkedin visibility", await imgLinkedin.isDisplayed(), true);
        return testManager.stopTest()
    });

    LOGINDATA.forEach(function(data, index) {
        it("Data-Driven Test", async function() {
            testManager.startTest();
            await browser.url(browser.options.baseUrl);
            await browser.maximizeWindow();
            await loginPage.enterUsername(data.username);
            await loginPage.enterPassword(data.password);
            await loginPage.clickLoginButton();
            if (data.error === "") {
                let btnLogin = await loginPage.btnLogin;
                await btnLogin.waitForDisplayed(20000, true);
                testManager.checkPoint(`${this.test.title}`, `Iteration#${index+1} - Check Login button visibility after valid login`, await btnLogin.isDisplayed(), false);
            } else {
                let lblAlertWarning = await loginPage.lblAlertWarning;
                let alertPresent = await lblAlertWarning.isDisplayed();
                testManager.checkPoint(`${this.test.title}`, `Iteration#${index+1} - Check if alert is shown for invalid login`, alertPresent, true);
                if (alertPresent) {
                    let txt = await lblAlertWarning.getText();
                    testManager.checkPoint(`${this.test.title}`, `Iteration#${index+1} - Check alert message text for invalid login`, txt.trim(), data.error);
                    let style = await lblAlertWarning.getAttribute("style");
                    testManager.checkPoint(`${this.test.title}`, `Iteration#${index+1} - Check alert message alignment is proper for invalid login`, style, "display: block;");
                }
            }
            return testManager.stopTest()
        });
    })

    it("Table Sort Test", async function() {
        testManager.startTest();
        await browser.url(browser.options.baseUrl);
        await browser.maximizeWindow();
        await loginPage.enterUsername("tableSorter");
        await loginPage.enterPassword("coolBro");
        await loginPage.clickLoginButton();
        await homePage.clickOnAmountColumnInRecentTransactions();
        /**
        * Validate sorted table using testdata having sorted data.This will check
        *   a) whether the 'Amount' column is sorted as expected.
        *   b) The data in other columns are as expected after sorting.
        */
        const TABLEDATA = require("./data/tabledata.json");
        for (let [index, data] of TABLEDATA.entries()) {
            var row = index + 1;
            testManager.checkPoint(this.test.title, `check STATUS for row#${row} after sorting`,await homePage.getStatusFromTable(row), data["STATUS"]);
            testManager.checkPoint(this.test.title, `check DATE for row#${row} after sorting`,await homePage.getDateFromTable(row), data["DATE"]);
            testManager.checkPoint(this.test.title, `check DESCRIPTION for row#${row} after sorting`,await homePage.getDescriptionFromTable(row), data["DESCRIPTION"]);
            testManager.checkPoint(this.test.title, `check CATEGORY for row#${row} after sorting`,await homePage.getCategoryFromTable(row), data["CATEGORY"]);
            testManager.checkPoint(this.test.title, `check AMOUNT for row#${row} after sorting`,await homePage.getAmountFromTable(row), data["AMOUNT"]);
        }
        return testManager.stopTest();
    });

    it("Canvas Chart Test",async function() {
        /**
         * Check is done by using npm library 'looks-same'
         * screenshot of the 'canvas' element is taken and compared with baseline file.
         * Not possible to compare part of the screenshot (possible with applitools.)
         */
        testManager.startTest();
        await browser.url(browser.options.baseUrl);
        await browser.maximizeWindow();
        await loginPage.enterUsername("expenseChecker");
        await loginPage.enterPassword("compareImages");
        await loginPage.clickLoginButton();
        await homePage.clickOnCompareExpenses();
        let canvas = await expensesPage.cnvsComparisonChart;
        await canvas.waitForDisplayed(20000);
        await browser.pause(2000);
        await expensesPage.saveCanvasAsImage("canvas-actual-default.png");
        await expensesPage.clickOnShowNextYear();
        await canvas.waitForDisplayed(20000);
        await browser.pause(2000);
        await expensesPage.saveCanvasAsImage("canvas-actual-nextyear.png");
        let res1 = await expensesPage.areImagesEqual("canvas-actual-default.png", "data/canvas-baseline-default.png");
        testManager.checkPoint(this.test.title, "check default canvas image matches with baseline", res1, true);
        let res2 = await expensesPage.areImagesEqual("canvas-actual-nextyear.png", "data/canvas-baseline-nextyear.png");
        testManager.checkPoint(this.test.title, "check canvas with next year image matches with baseline", res2, true);
        return testManager.stopTest();
    });

    it("Dynamic Content Test",async function() {
        testManager.startTest();
        await browser.url(`${browser.options.baseUrl}?showAd=true`);
        await browser.maximizeWindow();
        await loginPage.enterUsername("checkAd");
        await loginPage.enterPassword("detect missed");
        await loginPage.clickLoginButton();
        let imgFlashSale1 = await homePage.imgFlashSale1;
        let imgFlashSale2 = await homePage.imgFlashSale2;
        testManager.checkPoint(this.test.title, "check Image Flash Ad #1 presence",await imgFlashSale1.isExisting(), true);
        testManager.checkPoint(this.test.title, "check Image Flash Ad #2 presence",await imgFlashSale2.isExisting(), true);
        return testManager.stopTest();
    });

})