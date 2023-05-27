-- Criar o banco de dados rent_house se não existir
CREATE DATABASE IF NOT EXISTS rent_house;

-- Usar o banco de dados rent_house
USE rent_house;

-- Tabela users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  cnpj VARCHAR(18),
  phone VARCHAR(20) NOT NULL,
  fullname VARCHAR(255) NOT NULL
);

-- Tabela properties
CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  totalarea INT,
  bedrooms INT,
  bathrooms INT,
  cargarage INT,
  pets BOOLEAN,
  rent BOOLEAN DEFAULT false,
  furniture BOOLEAN DEFAULT false,
  price DECIMAL(10, 2),
  street VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  neighborhood VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zipcode VARCHAR(10) NOT NULL,
  complement VARCHAR(255),
  description TEXT,
  FOREIGN KEY (id_user) REFERENCES users(id)
);

-- Tabela photos
CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_property INT,
  thumbnail BOOLEAN NOT NULL DEFAULT false,
  path TEXT,
  caption VARCHAR(255),
  FOREIGN KEY (id_property) REFERENCES properties(id),
  CONSTRAINT unique_thumbnail_per_property UNIQUE (id_property, thumbnail)
);
