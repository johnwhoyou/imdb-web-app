const { data } = require("autoprefixer");
const { randomUUID } = require("crypto");
const { Cluster } = require("puppeteer-cluster");

// Case #1
(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
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

  // TODO: Change this to same page
  cluster.queue(
    "https://imdb-web-app.vercel.app/view/424636d3-d9fc-11ed-8452-0242ac180002"
  );
  cluster.queue(
    "https://imdb-web-app.vercel.app/view/af959bef-d8e0-4c95-bf48-29caba63da56"
  );

  await cluster.idle();
  await cluster.close();

  // TODO: implement checking for diff logic
  console.log(dataItems);
})();
