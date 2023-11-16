

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.get('/api/scrape', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Fetch HTML content
    const { data } = await axios.get(url);

    // Use cheerio to parse HTML
    const $ = cheerio.load(data);

    // Extract product details
    const products = [];

    $('.s-result-item').each((index, element) => {
      const title = $(element).find('h2 a span').text().trim();
      const rating = $(element).find('.a-icon-star-small .a-icon-alt').text().trim();
      const reviews = $(element).find('.s-item__reviews-count').text().trim();
      const image = $(element).find('img.s-image').attr('src');

      products.push({ title, rating, reviews, image });
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
