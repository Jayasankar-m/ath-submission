'use strict';
var loginPage = require("./pages/login.page.js");
var homePage = require("./pages/home.page.js");
var expensesPage = require("./pages/expenses.page.js");
const LOGINDATA = require("./data/logindata.json");
const {
    Eyes,
    Target
} = require('@applitools/eyes-webdriverio');
const appname = "Acme Demo App";
const eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

  
describe("VisualAI Tests", function () {
    before(function () {
        var APP_VERSION = process.env.APP_VERSION;
        if(!APP_VERSION){
            APP_VERSION = "v2"
        }
        eyes.setForceFullPageScreenshot(true);
        eyes.setBatch(`${appname} ${APP_VERSION} Tests`,`acme_${APP_VERSION}_${Date.now()}`);
    })


    it("Login Page UI Elements Test",async function(){
        await browser.url(browser.options.baseUrl);
        await browser.maximizeWindow();
        await eyes.open(browser,appname,this.test.title);
        await eyes.check('Login Window', Target.window().fully());
        await eyes.close();
    });

    LOGINDATA.forEach(function (data, index) {
        // Test can be extended by adding new entry in the logindata json file
        it("Data-Driven Test",async function () {
            await browser.url(browser.options.baseUrl);
            await browser.maximizeWindow();
            await loginPage.enterUsername(data.username);
            await loginPage.enterPassword(data.password);
            await loginPage.clickLoginButton();
            await eyes.open(browser,appname,`${this.test.title} #${index}`);
            await eyes.check(`check login status`, Target.window());
            await eyes.close();
        });
    })

    it("Table Sort Test",async function () {
        await browser.url(browser.options.baseUrl);
        await browser.maximizeWindow();
        await loginPage.enterUsername("table sorter");
        await loginPage.enterPassword("coolBro");
        await loginPage.clickLoginButton();
        await homePage.clickOnAmountColumnInRecentTransactions();
        let tblTransactions = await homePage.tblTransactions;
        await eyes.open(browser,appname,`${this.test.title}`);
        //await eyes.check(`check if table is sorted`, Target.window());
        await eyes.checkElementBySelector("table#transactionsTable",15000,"Check transaction table sorted by Amount column");
        await eyes.close();
    });

    it("Canvas Chart Test",async function() {
        this.timeout(300000);
        await browser.url(browser.options.baseUrl);
        await browser.maximizeWindow();
        await loginPage.enterUsername("expenseChecker");
        await loginPage.enterPassword("compareImages");
        await loginPage.clickLoginButton();
        await homePage.clickOnCompareExpenses();
        let canvas = await expensesPage.cnvsComparisonChart;
        await canvas.waitForDisplayed(20000);
        await browser.pause(2000);
        await eyes.open(browser,appname,`${this.test.title}`);
        await eyes.checkElementBySelector("canvas#canvas",15000,"Check default expenses chart");
        await expensesPage.clickOnShowNextYear();
        await canvas.waitForDisplayed(20000);
        await browser.pause(2000);
        await eyes.checkElementBySelector("canvas#canvas",15000,"Check expenses chart for next year data");
        await eyes.close();
    });

    it("Dynamic Content Test",async function() {
        await browser.url(`${browser.options.baseUrl}?showAd=true`);
        await browser.maximizeWindow();
        //await browser.url(`https://demo.applitools.com/hackathonV2.html?showAd=true`);
        await loginPage.enterUsername("checkAd");
        await loginPage.enterPassword("detect missed");
        await loginPage.clickLoginButton();
        await eyes.open(browser,appname,`${this.test.title}`);
        await eyes.check('check flash ad presence', Target.window().fully());
        await eyes.close();
    });

})