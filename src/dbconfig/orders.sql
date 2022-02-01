-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  total_price FLOAT NOT NULL,
  order_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(10) DEFAULT 'UNPAID',
  user_id INT NOT NULL,
  billing_address_id INT,
  shipping_address_id INT,
  payment_account_id INT,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
      ON DELETE CASCADE,
  FOREIGN KEY(billing_address_id)
    REFERENCES user_address(id)
      ON DELETE SET NULL,
  FOREIGN KEY(shipping_address_id)
    REFERENCES user_address(id)
      ON DELETE SET NULL,
  FOREIGN KEY(payment_account_id)
    REFERENCES user_payment_account(id)
      ON DELETE SET NULL,
  CONSTRAINT status_constraint
    CHECK (status = 'PAID' OR status = 'UNPAID')
  );

INSERT INTO orders (user_id, billing_address_id, shipping_address_id, payment_account_id, total_price)
VALUES (1, 1, 1, 1, 99.99);


CREATE TABLE IF NOT EXISTS order_products (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY(order_id)
    REFERENCES orders(id)
      ON DELETE CASCADE,
  FOREIGN KEY(product_id)
    REFERENCES products(id)
      ON DELETE CASCADE
  );