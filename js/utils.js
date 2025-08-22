const API_URL = 'https://article-backend-sesk.onrender.com/article';

// GET all articles
export async function getArticles() {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return []; 
  }
}

// POST a new article
export async function createArticle(articleData) {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = Array.isArray(errorData.errors) ? errorData.errors.join(', ') : 'Failed to create article';
    throw new Error(errorMessage);
  }

  return await response.json();
}

// PUT an existing article
export async function updateArticle(id, articleData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = Array.isArray(errorData.errors) ? errorData.errors.join(', ') : 'Failed to update article';
    throw new Error(errorMessage);
  }

  return await response.json();
}

// DELETE (soft delete) an article
export async function trashArticle(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

// GET article by ID
export async function getArticleById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Article not found');
    }
    return await response.json();
}