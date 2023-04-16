const { Cluster } = require("puppeteer-cluster");
const axios = require("axios");

const caseTwoTest = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
    puppeteerOptions: { headless: false },
  });

  const dataItems = [];
  let updateResult = "No write occured.";

  await cluster.execute(
    "https://imdb.johnjoyo.dev/api/movies?movie_id=0e9c3edf-7dc4-47af-accb-76a796e8d8b3",
    async ({ data: url }) => {
      const movieData = await axios
        .get(url)
        .then((response) => response.data.movie);
      dataItems.push(movieData);
    }
  );

  await cluster.execute(
    "https://imdb.johnjoyo.dev/update/0e9c3edf-7dc4-47af-accb-76a796e8d8b3",
    async ({ page, data: url }) => {
      await page.goto(url);

      await page.waitForXPath("/html/body/div/div/div/div[2]/form/input");
      const movieTitleInput = (await page.$x("/html/body/div/div/div/div[2]/form/input"))[0];
      await movieTitleInput.focus();
      await page.keyboard.type("Updated Movie");

      await page.waitForXPath("/html/body/div/div/div/div[2]/form/div[1]/section/input");
      const yearInput = (await page.$x("/html/body/div/div/div/div[2]/form/div[1]/section/input"))[0];
      await yearInput.focus();
      await page.keyboard.type("2059");
    
      await page.waitForXPath("/html/body/div/div/div/div[2]/form/div[2]/section[1]/select");
      const genreDropdown = (await page.$x("/html/body/div/div/div/div[2]/form/div[2]/section[1]/select"))[0];
      await genreDropdown.click();
    //   await page.waitForXPath("/html/body/div/div/div/div[2]/form/div[2]/section[1]/select/option[17]");
    //   const genreDropdownOption = (await page.$x("/html/body/div/div/div/div[2]/form/div[2]/section[1]/select/option[17]"))[0];
    //   await genreDropdownOption.click();
     
      //const selector = '/html/body/div/div/div/div[2]/form/div[2]/section[1]/select';
      //await page.waitForXPath(selector);
      await page.select(genreDropdown, 'Adult');


      // Submit Button
      await page.waitForXPath("/html/body/div/div/div/div[2]/div[2]/button[2]");
      const button = await page.$x(
        "/html/body/div/div/div/div[2]/div[2]/button[2]"
      );
      await button[0].click();

      const response = await page.waitForResponse(
        (response) => response.request().method() === "POST"
      );
      const status = response.status();

      if (status === 201) {
        updateResult = "Write transaction successful.";
      } else {
        updateResult = "Write transaction failed.";
      }
    }
  );

  await cluster.execute(
    "https://imdb.johnjoyo.dev/api/movies?movie_id=0e9c3edf-7dc4-47af-accb-76a796e8d8b3",
    async ({ data: url }) => {
      const movieData = await axios
        .get(url)
        .then((response) => response.data.movie);
      dataItems.push(movieData);
    }
  );

  await cluster.idle();
  await cluster.close();

  console.log("===========================================");
  console.log("            Case #2 Test Result            ");
  console.log("===========================================\n");

  await Promise.all(
    dataItems.map(async (item, index) => {
      console.log(`Read #${index + 1} Data:`);
      console.table(item);
      console.log("\n");
    })
  );

  console.log(updateResult);
  const dataItemsString = dataItems.map((item) => JSON.stringify(item));
  if (dataItems.length === 0) {
    console.log("Transaction failed.");
  } else if (dataItemsString.every((item) => item === dataItemsString[0]))
    console.log("Results: All data items match.");
  else console.log("Results: Data item mismatch. Check transactions.");

  console.log("\n\n\n");
};

module.exports = { caseTwoTest };
