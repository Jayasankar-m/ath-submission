'use strict';


class HomePage {

    get colAmountHead() { return $("table#transactionsTable th#amount") }
    get lnkCompareExpenses() { return $("a#showExpensesChart") }
    get imgFlashSale1() { return $("div#flashSale>img") }
    get imgFlashSale2() { return $("div#flashSale2>img") }
    get tblTransactions() {return $("table#transactionsTable") }

    async clickOnAmountColumnInRecentTransactions(){
        let el = await this.colAmountHead;
        await el.waitForDisplayed(20000);
        await el.click();
    }

    async clickOnCompareExpenses(){
        let el = await this.lnkCompareExpenses;
        await el.waitForDisplayed(20000);
        await el.click();
    }

    async getStatusFromTable(row){
        let el = await $(`table#transactionsTable tbody tr:nth-child(${row}) td:nth-child(1) span:nth-child(2)`);
        return await el.getText();
    }

    async getDateFromTable(row){
        let dt =  await $(`table#transactionsTable tbody tr:nth-child(${row}) td:nth-child(2) span:nth-child(1)`);
        let tm =  await $(`table#transactionsTable tbody tr:nth-child(${row}) td:nth-child(2) span:nth-child(2)`);
        let datePart = await dt.getText(); 
        let timePart = await tm.getText();
        return datePart + timePart;
    }

    async getDescriptionFromTable(row){
        let el = await $(`table#transactionsTable tbody tr:nth-child(${row}) td:nth-child(3) span`);
        return await el.getText();
    }

    async getCategoryFromTable(row){
        let el = await $(`table#transactionsTable tbody tr:nth-child(${row}) td:nth-child(4) a`);
        return await el.getText();
    }

    async getAmountFromTable(row){
        let el = await $(`table#transactionsTable tbody tr:nth-child(${row}) td:nth-child(5) span`);
        return await el.getText();
    }

}


module.exports = new HomePage();