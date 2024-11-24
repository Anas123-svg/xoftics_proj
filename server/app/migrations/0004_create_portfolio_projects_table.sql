CREATE TABLE portfolio_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    client_review VARCHAR(255) DEFAULT NULL,
    site_url VARCHAR(255) DEFAULT NULL
);

CREATE TABLE project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    image_url TEXT,
    FOREIGN KEY (project_id) REFERENCES portfolio_projects(id) ON DELETE CASCADE
);

CREATE TABLE project_technologies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    technology_name VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES portfolio_projects(id) ON DELETE CASCADE
);



