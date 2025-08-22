import { getArticles } from './utils.js';

const articlesContainer = document.getElementById('articles-container');
const paginationControls = document.getElementById('pagination-controls');
const articlesPerPage = 3; 
let currentPage = 1;

async function renderArticles() {
  const allArticles = await getArticles();

  const publishedArticles = allArticles.filter(a => a.status === 'publish');

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const articlesToShow = publishedArticles.slice(startIndex, endIndex);

  articlesContainer.innerHTML = '';
  if (articlesToShow.length === 0) {
    articlesContainer.innerHTML = '<p class="text-center">No published articles found.</p>';
  } else {
    articlesToShow.forEach(article => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-subtitle text-muted mb-2">${article.category}</p>
            <p class="card-text flex-grow-1">${article.content.substring(0, 150)}...</p>
          </div>
        </div>
      `;
      articlesContainer.appendChild(card);
    });
  }

  renderPagination(publishedArticles.length);
}

function renderPagination(totalArticles) {
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  paginationControls.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === currentPage ? 'active' : ''}`;
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.innerText = i;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      renderArticles();
    });
    li.appendChild(a);
    paginationControls.appendChild(li);
  }
}

document.addEventListener('DOMContentLoaded', renderArticles);