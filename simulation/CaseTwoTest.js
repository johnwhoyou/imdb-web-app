const { Cluster } = require("puppeteer-cluster");
const axios = require("axios");

const caseTwoTest = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
    puppeteerOptions: { headless: true },
  });

  const sampleMovieNames = [
    "Test Movie",
    "Updated Movie",
    "This is a Sample Title",
    "STADVDB Best Class",
    "Hello World!",
    "Distributed Databases: Greatest Fear of CS-ST Students",
  ];
  const dataItems = [];
  let updateResult = "No write occured.";
  let selectedName = "No movie name selected";

  await cluster.queue(
    "https://imdb.johnjoyo.dev/api/movies?movie_id=0e9c3edf-7dc4-47af-accb-76a796e8d8b3",
    async ({ data: url }) => {
      const movieData = await axios
        .get(url)
        .then((response) => response.data.movie);
      dataItems.push(movieData);
    }
  );

  await cluster.queue(
    "https://imdb.johnjoyo.dev/update/0e9c3edf-7dc4-47af-accb-76a796e8d8b3",
    async ({ page, data: url }) => {
      await page.goto(url);

      const movieName =
        sampleMovieNames[Math.floor(Math.random() * sampleMovieNames.length)];
      selectedName = movieName;

      await page.waitForXPath("/html/body/div/div/div/div[2]/form/input");
      const movieTitleInput = (
        await page.$x("/html/body/div/div/div/div[2]/form/input")
      )[0];
      await movieTitleInput.focus();
      await page.keyboard.type(selectedName);

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[1]/section/input"
      );
      const yearInput = (
        await page.$x("/html/body/div/div/div/div[2]/form/div[1]/section/input")
      )[0];
      await yearInput.focus();
      await page.keyboard.type("2069");

      // await new Promise((resolve) => setTimeout(resolve, 10000));
      // await page.select("select", "Western");

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[2]/section[2]/input"
      );
      const director = (
        await page.$x(
          "/html/body/div/div/div/div[2]/form/div[2]/section[2]/input"
        )
      )[0];
      await director.focus();
      await page.keyboard.type("test director");

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[3]/section[1]/input"
      );
      const firstActor = (
        await page.$x(
          "/html/body/div/div/div/div[2]/form/div[3]/section[1]/input"
        )
      )[0];
      await firstActor.focus();
      await page.keyboard.type("test first actor");

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[3]/section[2]/input"
      );
      const secondActor = (
        await page.$x(
          "/html/body/div/div/div/div[2]/form/div[3]/section[2]/input"
        )
      )[0];
      await secondActor.focus();
      await page.keyboard.type("test second actor");

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

  await cluster.queue(
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
      delete item.genre;
      console.log(`Read #${index + 1} Data:`);
      console.table(item);
      console.log("\n");
    })
  );

  console.log(`Update movie name to "${selectedName}"`);
  console.log(updateResult);
  if (dataItems.length === 0) {
    console.log("Transaction failed.");
  } else if (dataItems.every((item) => item.name === selectedName)) {
    console.log("Results: Read matches with update.");
  } else {
    console.log("Results: Read and Write mismatch. Check transactions.");
  }

  console.log("\n\n\n");
};

module.exports = { caseTwoTest };
