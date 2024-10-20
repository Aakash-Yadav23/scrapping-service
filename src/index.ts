import express, { Express } from "express";
import dotenv from "dotenv";
import path from 'path';
import { openFlipkartAndScrape } from "./Providers/scarapper";

dotenv.config({ path: path.join(__dirname, "../.env") })

const PORT = process.env.PORT;

const app = express();


app.get('/', (req, res) => {
  res.end("HELLO");
});




app.get('/scrape/amazon', async (req, res) => {

  const { product } = req.query;
  if (!product) res.status(400).send('Product query is required');

  const results = await openFlipkartAndScrape('laptop', "electronic", "flipkart");
  res.json(results);

});

// app.get('/scrape/flipkart', async (req, res) => {
//   const { product } = req.query;
//   if (!product) return res.status(400).send('Product query is required');

//   const results = await scrapeFlipkart(product as string);
//   res.json(results);
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
