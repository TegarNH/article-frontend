const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Serve file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve halaman HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/all_posts.html'));
});

app.get('/add-new', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/add_new.html'));
});

app.get('/preview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/preview.html'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});