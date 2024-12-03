CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    role ENUM('admin', 'manager', 'moderator') DEFAULT NULL
);
