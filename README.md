## Installation & Setup

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
DB_NAME=LibraryDB
JWT_SECRET=your_jwt_secret_key
```

### **4️⃣ Run the Server**

```bash
npx ts-node src/server.ts
```

Your API is now running at `http://localhost:5000/`

---

## Database Setup

You will find a file named `librarydb.sql`
Import it into your MySQL using phpmyadmin or any other tool

All authors hashed password = 'authors@Password`

# or

### **Create MySQL Database**

```sql
CREATE DATABASE LibraryDB;
```

### **Create Tables**

```sql
-- Authors Table (Handles Authentication Too)
CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed
    bio TEXT,
    is_deleted TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Books Table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    published_year INT,
    genre VARCHAR(100),
    is_deleted TINYINT(1) DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## API Authentication (JWT)

- Users must register using `http://localhost:5000/auth/register` to make an author account.
- Users must log in using `http://localhost:5000/auth/login` to receive a **JWT token**.
- This token must be included in the `Authorization` header as:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## End Points

### **1️⃣ Authors (Handles Authentication Too)**

1- author/register(Add a new author)

    method : POST
    Api : http://localhost:5000/auth/register
    body as form data :
        -name
        -email
        -password
        -bio

2- author/login

    method : POST
    Api : http://localhost:5000/auth/login
    body as form data :
        -email
        -password

3- Update an author

    method : PUT
    Api : http://localhost:5000/authors/:id
    headers :
        - Bearer token that back from login
    body as form data :
        - name
        - bio
    notes :
        replace :id with the author id you want to update

4- Delete an author

    method : DELETE
    Api : http://localhost:5000/authors/:id
    headers :
        - Bearer token that back from login
    body as form data :
        - no data required
    notes :
        replace :id with the author id you want to delete

5- List all authors

    method : GET
    Api : http://localhost:5000/authors
    headers :
        - Bearer token that back from login
    body as form data :
        - no data required

### **2️⃣ Books**

1- Add a new book

    method : POST
    Api : http://localhost:5000/books
    headers :
        - Bearer token that back from login
    body as form data :
        - title
        - authorId
        - publishedYear
        - genre
    notes :
        only author can add book

2- Update a book

    method : PUT
    Api : http://localhost:5000/books/:id
    headers :
        - Bearer token that back from login
    body as form data :
        - title
        - publishedYear
        - genre
    notes :
        replace :id with the book id you want to update

3- Delete a book

    method : DELETE
    Api : http://localhost:5000/books/:id
    headers :
        - Bearer token that back from login
    body as form data :
        - no data required
    notes :
        replace :id with the book id you want to delete

4- List all books

    method : GET
    Api : http://localhost:5000/books
    headers :
        - Bearer token that back from login
    body as form data :
        - no data required

## Design Patterns Used

### **1️⃣ Singleton Pattern (Database Connection)**

- The database connection (`db.ts`) is implemented as a **singleton** to ensure a single instance is used throughout the application, improving efficiency and resource management.

### **2️⃣ Controller-Service Pattern**

- The API follows a **Controller-Service structure**, where:
  - **Controllers** handle HTTP requests and responses.
  - **Services** contain business logic and database interactions.

### **3️⃣ Middleware Pattern**

- Authentication (`AuthMiddleware`) is implemented as middleware to ensure all protected routes require JWT authentication before processing requests.

---

## Trello Board

You can access the Trello board [here](https://trello.com/invite/b/67c080282fbc0169cd4cca0b/ATTIf7f1fbe5ba0bbe98e666ff2c1bcbffd74F8566B5/opensooq-task).

---

## Final Notes

- Ensure the database is set up before running the API.
- Use Postman to test the endpoints with JWT authentication.
- The API uses soft delete for authors and books, marking them as deleted (is_deleted = 1) instead of removing them permanently.

