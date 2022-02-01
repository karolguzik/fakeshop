-- -- USER TYPE
-- CREATE TABLE IF NOT EXISTS user_type (
--   user_type_id SERIAL PRIMARY KEY,
--   user_id INT NOT NULL,
--   type VARCHAR(10) NOT NULL,
--   CONSTRAINT fk_user
--     FOREIGN KEY(user_id)
--       REFERENCES users(user_id)
--         ON DELETE CASCADE
--   );

-- USERS
-- first_name VARCHAR(50),
-- last_name VARCHAR(50)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL
  );

INSERT INTO users (username, password, email)
VALUES ('karolguzik', 'password', 'karolguzik@gmail.com');


-- ADMIN TYPE
CREATE TABLE IF NOT EXISTS admin (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
      ON DELETE CASCADE
  );


-- DETAILS
CREATE TABLE IF NOT EXISTS user_details (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
      ON DELETE CASCADE
  );


-- ADDRESS
CREATE TABLE IF NOT EXISTS user_address (
  id SERIAL PRIMARY KEY,
  city VARCHAR(50) NOT NULL,
  street VARCHAR(50),
  postcode VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
      ON DELETE CASCADE
  );

INSERT INTO user_address (user_id, city, street, postcode, country)
VALUES (1, 'Warszawa', 'Wojska Polskiego', 18-400, 'Poland');


-- PAYMENTS
CREATE TABLE IF NOT EXISTS user_payment_account (
  id SERIAL PRIMARY KEY,
  account_name VARCHAR(50) NOT NULL,
  account_number INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
      ON DELETE CASCADE
  );