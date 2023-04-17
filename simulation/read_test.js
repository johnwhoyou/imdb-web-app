const { Cluster } = require("puppeteer-cluster");
const axios = require("axios");

const read_test = async () => {
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

  await cluster.idle();
  await cluster.close();

  console.log()
  console.log("===========================================");
  console.log("            Read Entry Result            ");
  console.log("===========================================");

  await Promise.all(
    dataItems.map(async (item, index) => {
      delete item.genre;
      console.log(`\nRead Transaction: `);
      console.table(item);
      console.log("\n");
    })
  );

  console.log("\n\n\n");
};

read_test()