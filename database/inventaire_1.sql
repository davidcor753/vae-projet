CREATE DATABASE inventaire_1;

USE inventaire_1;


CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE locations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL unique,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    PRIMARY KEY (id)
);


CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(255) NOT NULL UNIQUE,
category_id INT NOT NULL,
location_id INT NOT NULL,    
status ENUM(
        'En production',
        'Defaut',
        'En Stock'
    ) NOT NULL DEFAULT 'En Stock',
    description TEXT,

    PRIMARY KEY (id),

    FOREIGN KEY (category_id)
        REFERENCES category(id),

    FOREIGN KEY (location_id)
        REFERENCES locations(id)
);

CREATE TABLE inventaire_actions (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT,
    action_type ENUM('create', 'update', 'delete') NOT NULL,
    actor_user_id INT,
    actor_username VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    FOREIGN KEY (item_id)
        REFERENCES items(id)
        ON DELETE SET NULL,

    FOREIGN KEY (actor_user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);
