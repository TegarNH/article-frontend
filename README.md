# Article Management Project

A simple full-stack application for managing articles, built with a Go (Gin) backend and a Vanilla JavaScript frontend. The backend is designed for deployment on Render, and the frontend is optimized for Vercel.

-----

## Technologies Used

  - **Backend**: Go, Gin, `go-sql-driver/mysql`, `golang-migrate`
  - **Frontend**: HTML, CSS, Vanilla JavaScript, Bootstrap 5 (via CDN)
  - **Database**: MySQL / TiDB
  - **Deployment**: Render (Backend), Vercel (Frontend)

-----

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

  - [Go](https://golang.org/dl/) (version 1.21 or newer)
  - A local MySQL server (e.g., [XAMPP](https://www.apachefriends.org/index.html))
  - [golang-migrate/migrate CLI](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate)

-----

## Frontend Setup (Vanilla JS)

Follow these steps to get the frontend running locally and connected to your local backend.

### 1\. Configure API Endpoint

1.  Open the frontend's JavaScript utility file (e.g., `js/utils.js`).

2.  Find the `API_URL` constant and change its value to point to your local backend server.

    ```javascript
    // in utils.js
    const API_URL = 'http://localhost:8080/article'; // Use local backend for development
    ```

### 2\. Run the Frontend

Since this is a static site, you only need a simple local server.

#### Method 1: Using VS Code Live Server (Recommended)

1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in Visual Studio Code.
2.  Right-click on your main HTML file (e.g., `pages/all_posts.html` or `index.html`).
3.  Select **"Open with Live Server"**.
4.  Your browser will open the page, and it will automatically reload when you save changes.

#### Method 2: Using a Simple Terminal Server

If you don't use VS Code, you can use any simple HTTP server.

1.  Navigate to the root directory of your frontend project in the terminal.

2.  Run the following command (requires Node.js/npx):

    ```bash
    npx http-server .
    ```

3.  Open your browser and go to the URL provided (usually `http://localhost:8080` or `http://localhost:8081`).

-----

## Deployment

  - **Backend**: The Go application is configured to be deployed on **Render**.
  - **Frontend**: The static frontend is configured for deployment on **Vercel**.
