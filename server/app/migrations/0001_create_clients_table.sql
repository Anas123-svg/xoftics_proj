CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    company_name VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) DEFAULT NULL,
    profile_image VARCHAR(255) DEFAULT NULL
);
