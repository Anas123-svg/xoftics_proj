CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT
);

CREATE TABLE blog_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    image_url TEXT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);