const { Cluster } = require("puppeteer-cluster");
const axios = require("axios");

const update_test = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
    puppeteerOptions: { headless: true },
  });

  const sampleMovieNames = [
    // "Test Movie",
    // "Updated Movie",
    // "This is a Sample Title",
    // "STADVDB Best Class",
    // "Hello World!",
    "Distributed Databases: Greatest Fear of CS-ST Students",
  ];

  const dataItems = [];

  const year = "2069"
  const director_input = "test director"
  const firstActor_input = "test first actor"
  const secondActor_input = "test second actor"
  var data = {}

  await cluster.task(async ({ page, data: url }) => {
    const movieData = await axios
      .get(url)
      .then((response) => response.data.movie);
    dataItems.push(movieData);
  });

  cluster.execute(
    "https://imdb.johnjoyo.dev/update/0e9c3edf-7dc4-47af-accb-76a796e8d8b3",
    async ({ page, data: url }) => {
      await page.goto(url);


      const movieName = "STADVDB Best Class"
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
      await page.keyboard.type(year);

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[2]/section[2]/input"
      );
      const director = (
        await page.$x(
          "/html/body/div/div/div/div[2]/form/div[2]/section[2]/input"
        )
      )[0];
      await director.focus();
      await page.keyboard.type(director_input);

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[3]/section[1]/input"
      );
      const firstActor = (
        await page.$x(
          "/html/body/div/div/div/div[2]/form/div[3]/section[1]/input"
        )
      )[0];
      await firstActor.focus();
      await page.keyboard.type(firstActor_input);

      await page.waitForXPath(
        "/html/body/div/div/div/div[2]/form/div[3]/section[2]/input"
      );
      const secondActor = (
        await page.$x(
          "/html/body/div/div/div/div[2]/form/div[3]/section[2]/input"
        )
      )[0];
      await secondActor.focus();
      await page.keyboard.type(secondActor_input);

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

      data.name = movieName
      data.year = year
      data.director = director_input
      data.firstActor = firstActor_input
      data.secondActor = secondActor_input
    }
  );

  await cluster.idle();
  await cluster.close();

  console.log()
  console.log("===========================================");
  console.log("            Update Entry Result            ");
  console.log("===========================================");


  console.log(`Update Transaction Data:`);
  console.table(data);
  console.log("\n");

  console.log("\n\n\n");
};

update_test()