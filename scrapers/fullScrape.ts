import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

const fullScrape = async (ticker: string) => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    const formattedData = [];
    await driver.get(`https://finance.yahoo.com`);
    await driver.manage().window().maximize();
    await driver
      .findElement(By.id('yfin-usr-qry'))
      .sendKeys(ticker, Key.RETURN);
    await driver
      .wait(
        until.elementLocated(
          By.className('Pos(a) T(20px) End(20px) P(4px) Bd(0) Bgc(t) M(0)'),
        ),
      )
      .click();
    await driver
      .wait(until.elementLocated(By.linkText('Historical Data')))
      .click();
    await driver.sleep(500);
    await driver.executeScript('window.scrollTo(0, 100000000000)');
    await driver.sleep(500);
    await driver.executeScript('window.scrollTo(0, 100000000000)');
    const data = await driver.findElements(
      By.className('BdT Bdc($seperatorColor) Ta(end) Fz(s) Whs(nw)'),
    );
    for (let i = 0; i < data.length; i++) {
      const stockDataText = (await data[i].getText()).split(' ');
      if (stockDataText.length === 9)
        formattedData.push({
          date: `${stockDataText[0]} ${stockDataText[1]} ${stockDataText[2]}`,
          open: +stockDataText[3],
          high: +stockDataText[4],
          low: +stockDataText[5],
          close: +stockDataText[6],
          ticker,
        });
    }

    return formattedData;
  } finally {
    await driver.quit();
  }
};

export default fullScrape;
