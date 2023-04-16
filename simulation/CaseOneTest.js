const { Cluster } = require("puppeteer-cluster");
const axios = require("axios");

const caseOneTest = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
    puppeteerOptions: { headless: true },
  });

  const dataItems = [];

  await cluster.task(async ({ page, data: url }) => {
    const movieData = await axios
      .get(url)
      .then((response) => response.data.movie);
    dataItems.push(movieData);
  });

  cluster.queue(
    "https://imdb.johnjoyo.dev/api/movies?movie_id=0e9c3edf-7dc4-47af-accb-76a796e8d8b3"
  );
  cluster.queue(
    "https://imdb.johnjoyo.dev/api/movies?movie_id=0e9c3edf-7dc4-47af-accb-76a796e8d8b3"
  );

  await cluster.idle();
  await cluster.close();

  console.log("===========================================");
  console.log("            Case #1 Test Result            ");
  console.log("===========================================");

  await Promise.all(
    dataItems.map(async (item, index) => {
      delete item.genre;
      console.log(`Transaction #${index + 1} Data:`);
      console.table(item);
      console.log("\n");
    })
  );

  const dataItemsString = dataItems.map((item) => JSON.stringify(item));
  if (dataItemsString.every((item) => item === dataItemsString[0]))
    console.log("Results: All data items match.");
  else console.log("Results: Data item mismatch. Check transactions.");

  console.log("\n\n\n");
};

module.exports = { caseOneTest };
