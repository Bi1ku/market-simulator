import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

export const scraper = async (ticker: string) => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    const formattedData = [];
    await driver.get(`https://finance.yahoo.com`);
    await driver
      .findElement(By.id('yfin-usr-qry'))
      .sendKeys(ticker, Key.RETURN);
    await driver.wait(
      until.elementLocated(By.linkText('Historical Data')),
      10000,
    );
    await driver.findElement(By.linkText('Historical Data')).click();
    await driver.wait(
      until.elementsLocated(
        By.className('BdT Bdc($seperatorColor) Ta(end) Fz(s) Whs(nw)'),
      ),
    );
    const data = await driver.findElements(
      By.className('BdT Bdc($seperatorColor) Ta(end) Fz(s) Whs(nw)'),
    );
    for (let i = 0; i < data.length; i++) {
      const stockDataText = (await data[i].getText()).split(' ');
      formattedData.push({
        name: `${stockDataText[0]} ${stockDataText[1]} ${stockDataText[2]}`,
        open: stockDataText[3],
        high: stockDataText[4],
        low: stockDataText[5],
        close: stockDataText[6],
      });
    }
  } finally {
    await driver.quit();
  }
};
