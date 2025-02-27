CREATE DATABASE LibraryDB;
USE LibraryDB;

-- Authors Table (Handles Authentication Too)
CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed
    bio TEXT
);

-- Books Table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    published_year INT,
    genre VARCHAR(100),
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);
