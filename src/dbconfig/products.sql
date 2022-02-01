-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
  );

INSERT INTO categories (name)
VALUES ('Electronic');


-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL,
  quantity INT NOT NULL,
  category_id INT,
  FOREIGN KEY(category_id)
    REFERENCES categories(id)
      ON DELETE SET NULL
  );

INSERT INTO products (category_id, name, price, quantity)
VALUES (1, 'Monitor', 99.99, 2);


-- STOCK
CREATE TABLE IF NOT EXISTS stock (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY(product_id)
    REFERENCES products(id)
      ON DELETE CASCADE
  );