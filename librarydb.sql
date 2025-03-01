CREATE DATABASE LibraryDB;
USE LibraryDB;

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

-- Insert Sample Data
INSERT INTO authors (name, email, password, bio) VALUES
('Omar Fathi', 'omarfathiabed@gmail.com', '$2b$10$jCRguYa5XIYr73.LRYfIi.hiKN8lF7b8.Z.tp0UxkNTUmtBGFtJUy', 'Fiction writer.'),
('Omar', 'omarfathiabed1@example.com', '$2b$10$jCRguYa5XIYr73.LRYfIi.hiKN8lF7b8.Z.tp0UxkNTUmtBGFtJUy', 'Science author.'),
('Omer', 'omarfathiabed2@example.com', '$2b$10$jCRguYa5XIYr73.LRYfIi.hiKN8lF7b8.Z.tp0UxkNTUmtBGFtJUy', 'Historical novelist.');

INSERT INTO books (title, author_id, published_year, genre) VALUES
('The Great Adventure', 1, 2001, 'Adventure'),
('Science Explained', 2, 2015, 'Science'),
('History Unfolded', 3, 1998, 'History');
