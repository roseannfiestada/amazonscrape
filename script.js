// script.js

function scrapeAmazon() {
    const keyword = document.getElementById('keyword').value;
  
    fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error:', error));
  }
  
  function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (data.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
  
      const title = document.createElement('h3');
      title.textContent = product.title;
  
      const rating = document.createElement('p');
      rating.textContent = `Rating: ${product.rating}`;
  
      const reviews = document.createElement('p');
      reviews.textContent = `Reviews: ${product.reviews}`;
  
      const image = document.createElement('img');
      image.src = product.image;
  
      productDiv.appendChild(title);
      productDiv.appendChild(rating);
      productDiv.appendChild(reviews);
      productDiv.appendChild(image);
  
      resultsContainer.appendChild(productDiv);
    });
  }
  