'use strict';
var fs = require("fs");

class TestManager {
    constructor(reportpath) {
        this.reportpath = reportpath;
        this.checkpoints = [];
        fs.writeFileSync(this.reportpath, "TestName,CheckPoint,Expected,Actual,Result\r\n")
    }

    checkPoint(testname, checkpointsummary, actual, expected) {
        var result = actual === expected ? "Pass" : "Fail";
        this.checkpoints.push({
            testname,
            checkpointsummary,
            actual,
            expected,
            result
        })
        fs.appendFileSync(this.reportpath, `"${testname}","${checkpointsummary}","${expected}","${actual}","${result}"\r\n`);
    }

    startTest() {
        this.checkpoints = [];
    }

    stopTest() {
        var failedCases = this.checkpoints.filter((itm) => {
            return itm.result === "Fail"
        });
        if (failedCases.length > 0) {
            var err = `${failedCases[0]['testname']} - ${failedCases.length} checkpoints failing.`;
            failedCases.forEach((itm) => {
                err = `${err}\nCheckpoint# ${itm.checkpointsummary} - Expected : ${itm.expected}, Actual : ${itm.actual}`;
            });
            throw new Error(err);
        }
    }
}


module.exports = TestManager;