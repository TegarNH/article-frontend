import { createArticle, updateArticle, getArticleById } from './utils.js';

const formTitle = document.getElementById('form-title');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const categoryInput = document.getElementById('category');
const publishBtn = document.getElementById('publish-btn');
const draftBtn = document.getElementById('draft-btn');

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

async function populateFormForEdit() {
  if (articleId) {
    formTitle.innerText = 'Edit Post';
    try {
      const article = await getArticleById(articleId);
      titleInput.value = article.title;
      contentInput.value = article.content;
      categoryInput.value = article.category;
    } catch (error) {
      console.error('Failed to fetch article for editing:', error);
      alert('Article not found!');
      window.location.href = '/'; // Kembali ke halaman utama jika artikel tidak ditemukan
    }
  }
}

async function saveArticle(status) {
  const title = titleInput.value;
  const content = contentInput.value;
  const category = categoryInput.value;

  if (!title || !content || !category) {
    alert('All fields are required!');
    return;
  }

  const articleData = {
    title,
    content,
    category,
    status,
  };

  try {
    if (articleId) {
      await updateArticle(articleId, articleData);
      alert('Article updated successfully!');
    } else {
      await createArticle(articleData);
      alert('Article created successfully!');
    }
    window.location.href = '/'; // Redirect kembali ke halaman all posts
  } catch (error) {
    console.error('Failed to save article:', error);
    alert('Failed to save article. Please try again.');
  }
}

publishBtn.addEventListener('click', () => saveArticle('publish'));
draftBtn.addEventListener('click', () => saveArticle('draft'));

document.addEventListener('DOMContentLoaded', populateFormForEdit);