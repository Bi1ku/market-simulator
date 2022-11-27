import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import fullScrape from '../scrapers/fullScrape';
import partialScrape from '../scrapers/partialScrape';

const prisma = new PrismaClient();

// Schedule tasks to be run on the server.
// */10 * * * *
cron.schedule('*/10 * * * *', async () => {
  try {
    const stocks = await prisma.stock.findMany({
      select: { stockData: true, ticker: true },
    });
    for (const stock of stocks) {
      if (stock.stockData) {
        const data = await partialScrape(stock.ticker);
        await prisma.stockData.createMany({
          data: data.filter((v) =>
            stock.stockData.every((v2) => v2.date !== v.date),
          ),
        });
      } else {
        const data = await fullScrape(stock.ticker);
        await prisma.stockData.createMany({
          data,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});
