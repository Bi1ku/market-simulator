import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

const scraper = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
};

scraper();
