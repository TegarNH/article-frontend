import { getArticles, trashArticle } from './utils.js';

const publishedBody = document.getElementById('published-table-body');
const draftsBody = document.getElementById('drafts-table-body');
const trashedBody = document.getElementById('trashed-table-body');

async function renderTables() {
  const articles = await getArticles();

  publishedBody.innerHTML = '';
  draftsBody.innerHTML = '';
  trashedBody.innerHTML = '';

  // Filter dan render data untuk setiap tab
  articles.forEach(article => {
    let tbody;
    let actionIcons;

    if (article.status === 'trash') {
      tbody = trashedBody;
      // Jika statusnya 'trash', jangan tampilkan ikon trash
      actionIcons = `
        <i class="fas fa-edit me-2 edit-icon" data-id="${article.id}" style="cursor:pointer;"></i>
        `;
    } else {
      // Untuk status 'publish' dan 'draft'
      tbody = (article.status === 'publish') ? publishedBody : draftsBody;
      actionIcons = `
        <i class="fas fa-edit me-2 edit-icon" data-id="${article.id}" style="cursor:pointer;"></i>
        <i class="fas fa-trash-alt trash-icon" data-id="${article.id}" style="cursor:pointer;"></i>
      `;
    }

    switch(article.status) {
      case 'publish':
        tbody = publishedBody;
        break;
      case 'draft':
        tbody = draftsBody;
        break;
      case 'trash':
        tbody = trashedBody;
        break;
      default:
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${article.title}</td>
      <td>${article.category}</td>
      <td>
        ${actionIcons}
      </td>
    `;
    tbody.appendChild(row);
  });

  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll('.edit-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      // Redirect ke halaman add-new dengan parameter ID untuk mode edit
      window.location.href = `/add-new?id=${id}`;
    });
  });

  document.querySelectorAll('.trash-icon').forEach(icon => {
    icon.addEventListener('click', async (e) => { 
      const id = e.target.dataset.id;
      if (confirm('Are you sure you want to move this article to trash?')) {
        await trashArticle(id);
        // Render ulang tabel untuk menampilkan perubahan
        renderTables();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderTables);