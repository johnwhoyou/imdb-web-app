const { caseOneTest } = require("./CaseOneTest");
const { caseTwoTest } = require("./CaseTwoTest");
const { caseThreeTest } = require("./CaseThreeTest");

const runTests = async () => {
  await caseOneTest();
  await caseTwoTest();
  await caseThreeTest();
};

runTests();
