
    const API_KEY = '294e2179a5ad45b784574885fab2a5d3';
    const query = '("earthquake" OR "flood" OR "wildfire" OR "tsunami" OR "cyclone")';
    const NEWS_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${API_KEY}`;

    let allArticles = [];

    async function fetchDisasterNews() {
      try {
        const res = await fetch(NEWS_URL);
        const data = await res.json();
        allArticles = data.articles || [];
        document.getElementById('loading').style.display = 'none';
        renderNews(allArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('loading').innerText = 'Failed to load news.';
      }
    }

    function renderNews(articles) {
      const container = document.getElementById('news-container');
      container.innerHTML = '';

      if (!articles || articles.length === 0) {
        container.innerHTML = '<p style="color:white;">No news found.</p>';
        return;
      }

      articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';

        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleString();

        const lowerText = (article.title + ' ' + article.description).toLowerCase();
        let tagClass = 'default';
        let tagLabel = 'General';

        if (lowerText.includes('earthquake')) {
          tagClass = 'earthquake'; tagLabel = 'Earthquake';
        } else if (lowerText.includes('flood')) {
          tagClass = 'flood'; tagLabel = 'Flood';
        } else if (lowerText.includes('wildfire') || lowerText.includes('wildfire')) {
          tagClass = 'wildfire'; tagLabel = 'Wildfire';
        } else if (lowerText.includes('cyclone')) {
          tagClass = 'cyclone'; tagLabel = 'Cyclone';
        } else if (lowerText.includes('tsunami')) {
          tagClass = 'tsunami'; tagLabel = 'Tsunami';
        } else if(lowerText.includes('drought')) {
          tagClass = 'drought'; tagLabel = 'drought';
        } 
        else{
          return;
        }

        card.innerHTML = `
          <h2>${article.title}</h2>
          <div class="date-time">${formattedDate}</div>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <div class="tag ${tagClass}">${tagLabel}</div>
        `;
        container.appendChild(card);
      });
    }

    document.getElementById('search-input').addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = allArticles.filter(article =>
        (article.title + article.description).toLowerCase().includes(keyword)
      );
      renderNews(filtered);
    });

    window.onload = fetchDisasterNews;


    // script.js
const cardsPerPage = 9; // Number of cards to display per page
let currentPage = 1; // Current page number
const totalCards = 40; // Total number of cards (you can update this daily)
const totalPages = Math.ceil(totalCards / cardsPerPage); // Total number of pages

// Function to generate dummy card data
function generateCards() {
    const cards = [];
    for (let i = 1; i <= totalCards; i++) {
        cards.push(`Card ${i}`);
    }
    return cards;
}

// Function to display cards for the current page
function displayCards(cards) {
    const cardContainer = document.getElementById('news-container');
    cardContainer.innerHTML = ''; // Clear previous cards

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const cardsToDisplay = cards.slice(start, end);

    cardsToDisplay.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'news-card';
        cardElement.textContent = card;
        cardContainer.appendChild(cardElement);
    });

    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to handle pagination
function updatePagination() {
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
        displayCards(generateCards());
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
        displayCards(generateCards());
    }
});

// Initial display
displayCards(generateCards());
updatePagination();