const { Cluster } = require("puppeteer-cluster");

const caseOneTest = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
    puppeteerOptions: { headless: false },
  });

  const dataItems = [];

  await cluster.task(async ({ page, data: url }) => {
    let movieData = {};

    await page.goto(url);

    let selector = "/html/body/div/div/div/div[2]/form/p";
    await page.waitForSelector(`xpath${selector}`);
    let [element] = await page.$x(selector);
    let value = await page.evaluate((el) => el.textContent, element);
    movieData.title = value;

    selector = "/html/body/div/div/div/div[2]/form/div[1]/section/p";
    await page.waitForSelector(`xpath${selector}`);
    [element] = await page.$x(selector);
    value = await page.evaluate((el) => el.textContent, element);
    movieData.year = value;

    selector = "/html/body/div/div/div/div[2]/form/div[2]/section[1]/p";
    await page.waitForSelector(`xpath${selector}`);
    [element] = await page.$x(selector);
    value = await page.evaluate((el) => el.textContent, element);
    movieData.genre = value;

    selector = "/html/body/div/div/div/div[2]/form/div[2]/section[2]/p";
    await page.waitForSelector(`xpath${selector}`);
    [element] = await page.$x(selector);
    value = await page.evaluate((el) => el.textContent, element);
    movieData.director = value;

    selector = "/html/body/div/div/div/div[2]/form/div[3]/section[1]/p";
    await page.waitForSelector(`xpath${selector}`);
    [element] = await page.$x(selector);
    value = await page.evaluate((el) => el.textContent, element);
    movieData.firstActor = value;

    selector = "/html/body/div/div/div/div[2]/form/div[3]/section[2]/p";
    await page.waitForSelector(`xpath${selector}`);
    [element] = await page.$x(selector);
    value = await page.evaluate((el) => el.textContent, element);
    movieData.secondActor = value;

    dataItems.push(movieData);
  });

  cluster.queue(
    "https://imdb-web-app.vercel.app/view/af959bef-d8e0-4c95-bf48-29caba63da56"
  );
  cluster.queue(
    "https://imdb-web-app.vercel.app/view/af959bef-d8e0-4c95-bf48-29caba63da56"
  );
  cluster.queue(
    "https://imdb-web-app.vercel.app/view/af959bef-d8e0-4c95-bf48-29caba63da56"
  );

  await cluster.idle();
  await cluster.close();

  console.log("===========================================");
  console.log("            Case #1 Test Result            ");
  console.log("===========================================");

  dataItems.map((item, index) => {
    console.log(`Transaction #${index + 1} Data:`);
    console.table(item);
    console.log("\n");
  });

  const dataItemsString = dataItems.map((item) => JSON.stringify(item));
  if (dataItemsString.every((item) => item === dataItemsString[0]))
    console.log("Results: All data items match.");
  else console.log("Results: Data item mismatch. Check transactions.");

  console.log("\n\n\n");
};

module.exports = { caseOneTest };
