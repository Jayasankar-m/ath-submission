'use strict';
const util = require('util');
const looksSame = require("looks-same");

class ExpenseComparison {

    get btnShowDataForNextYear(){ return $("button#addDataset") }
    get cnvsComparisonChart() { return $("canvas#canvas") }

    async clickOnShowNextYear(){
        let el = await this.btnShowDataForNextYear
        await el.waitForDisplayed();
        await el.click();
    }

    async saveCanvasAsImage(imagepath){
        let el = await this.cnvsComparisonChart;
        await el.saveScreenshot(imagepath);
    }

    async areImagesEqual(image1,image2){
        var checkIfSame = util.promisify(looksSame);
        return checkIfSame(image1,image2,{tolerance: 5,pixelRatio: 2}).then(({equal})=>equal);
    }
}

module.exports = new ExpenseComparison()