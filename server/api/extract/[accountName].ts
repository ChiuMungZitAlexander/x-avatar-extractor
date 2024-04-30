import puppeteer from "puppeteer";

export interface IExtractAccountNameResponse {
  avatar: string;
}

export default defineEventHandler<Promise<IExtractAccountNameResponse | null>>(
  async (event) => {
    const accountName = getRouterParam(event, "accountName");

    if (!accountName) return null;

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      );
      await page.goto(`https://twitter.com/${accountName}/photo`);
      await page.waitForSelector("img.css-9pa8cd", { timeout: 5000 });

      const url = await page.evaluate(
        () => document.querySelector<HTMLImageElement>("img.css-9pa8cd")?.src
      );

      await browser.close();

      if (!url) {
        throw createError({
          statusCode: 500,
          statusMessage: "Evaluation is successful but src is not found",
        });
      }

      return { avatar: url };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage:
          (error as Error)?.message ||
          "Failed to extract avatar url during evaluation",
      });
    }
  }
);
