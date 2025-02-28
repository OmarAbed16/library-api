# Library Management System API

## 📌 Project Overview

This is a **RESTful API** for managing a library system, allowing **authors and books management** with authentication using **JWT tokens**.

## 🛠 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/OmarAbed16/library-api.git
cd library-api
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and configure:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=library_db
JWT_SECRET=your_jwt_secret_key
```

### **4️⃣ Run the Server**

```bash
npm start
```

Your API is now running at `http://localhost:5000/`

---

## 📂 Database Setup

### **Create MySQL Database**

```sql
CREATE DATABASE library_db;
```

### **Create Tables**

```sql
CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    published_year INT NOT NULL,
    genre VARCHAR(100),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

---

## 🔐 API Authentication (JWT)

- Users must log in using `/auth/login` to receive a **JWT token**.
- This token must be included in the `Authorization` header as:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🚀 Available Endpoints

### **🔹 Authentication**

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| `POST` | `/auth/register` | Register a new author     |
| `POST` | `/auth/login`    | Login and get a JWT token |

### **📚 Books Management**

| Method   | Endpoint     | Description         |
| -------- | ------------ | ------------------- |
| `POST`   | `/books`     | Add a new book      |
| `GET`    | `/books`     | Get all books       |
| `PUT`    | `/books/:id` | Update book details |
| `DELETE` | `/books/:id` | Delete a book       |

### **👨‍💼 Authors Management**

| Method   | Endpoint       | Description                         |
| -------- | -------------- | ----------------------------------- |
| `GET`    | `/authors`     | Get all authors                     |
| `PUT`    | `/authors/:id` | Update author details               |
| `DELETE` | `/authors/:id` | Delete an author (only if no books) |

---

## ✅ Postman Test Cases

### **Authentication**

1️⃣ **Register a New Author** (`POST /auth/register`)
2️⃣ **Login to Get JWT Token** (`POST /auth/login`)

### **Books**

1️⃣ **Add a Book** (`POST /books`)
2️⃣ **Get All Books** (`GET /books`)
3️⃣ **Update a Book** (`PUT /books/:id`)
4️⃣ **Delete a Book** (`DELETE /books/:id`)

### **Authors**

1️⃣ **Get All Authors** (`GET /authors`)
2️⃣ **Update an Author** (`PUT /authors/:id`)
3️⃣ **Delete an Author (No Books Only)** (`DELETE /authors/:id`)

---

## 🎯 Design Patterns Used

### **1️⃣ Singleton Pattern (Database Connection)**

- The database connection (`Database.ts`) is implemented as a **singleton** to ensure a single instance is used throughout the application, improving efficiency and resource management.

### **2️⃣ Controller-Service Pattern**

- The API follows a **Controller-Service structure**, where:
  - **Controllers** handle HTTP requests and responses.
  - **Services** contain business logic and database interactions.

### **3️⃣ Middleware Pattern**

- Authentication (`AuthMiddleware`) is implemented as middleware to ensure all protected routes require JWT authentication before processing requests.

---

## 🎉 Trello Board

You can access the Trello board [here](https://trello.com/invite/b/67c080282fbc0169cd4cca0b/ATTIf7f1fbe5ba0bbe98e666ff2c1bcbffd74F8566B5/opensooq-task).

---

## 🎉 Final Notes

- Ensure the database is set up before running the API.
- Use Postman to test the endpoints with JWT authentication.
- This API follows a **class-based service structure** for better maintainability.
- Implements **design patterns** like **Singleton, Controller-Service, and Middleware** to ensure scalability and clean code architecture.
