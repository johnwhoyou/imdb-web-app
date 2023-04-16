const { caseOneTest } = require("./CaseOneTest");
const { caseTwoTest } = require("./CaseTwoTest");

const runTests = async () => {
  await caseOneTest();
  await caseTwoTest();
};

runTests();
