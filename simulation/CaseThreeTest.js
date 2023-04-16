const { Cluster } = require("puppeteer-cluster");
const axios = require("axios");

const caseThreeTest = async () => {
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
  const updateResults = [];
  const selectedNames = [];

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

    const movieName =
      sampleMovieNames[Math.floor(Math.random() * sampleMovieNames.length)];
    selectedNames.push(movieName);

    await page.waitForXPath("/html/body/div/div/div/div[2]/form/input");
    const movieTitleInput = (
      await page.$x("/html/body/div/div/div/div[2]/form/input")
    )[0];
    await movieTitleInput.focus();
    await page.keyboard.type(movieName);

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
      updateResults.push(`Write #${updateResults.length + 1}: SUCCESS`);
    } else {
      updateResults.push(`Write #${updateResults.length + 1}: FAILED`);
    }
  });

  cluster.queue(
    "https://imdb.johnjoyo.dev/update/0e9c3edf-7dc4-47af-accb-76a796e8d8b3"
  );
  cluster.queue(
    "https://imdb.johnjoyo.dev/update/0e9c3edf-7dc4-47af-accb-76a796e8d8b3"
  );
  cluster.queue(
    "https://imdb.johnjoyo.dev/update/0e9c3edf-7dc4-47af-accb-76a796e8d8b3"
  );
  await cluster.idle();
  await cluster.close();

  console.log("===========================================");
  console.log("            Case #3 Test Result            ");
  console.log("===========================================\n");

  updateResults.map((result, index) => {
    console.log(result);
    console.log(
      `Transaction Attempted: Update movie title to "${selectedNames[index]}"\n`
    );
  });

  await axios
    .get(
      "https://imdb.johnjoyo.dev/api/movies?movie_id=0e9c3edf-7dc4-47af-accb-76a796e8d8b3"
    )
    .then((response) => {
      console.log("Final Read Result:");
      delete response.data.movie.genre;
      console.table(response.data.movie);
    });

  console.log("\n\n\n");
};

module.exports = { caseThreeTest };
