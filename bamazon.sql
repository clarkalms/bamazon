DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(256) NULL,
  department_name VARCHAR(256) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick with Alexa Voice Remote", "Electrionics", 29.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal", "Electrionics", 29.99, 440);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple AirPods", "Electrionics", 144.99, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VANKYO LEISURE 3 Mini Projector, 1080P and 170inch Display", "Electrionics", 89.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AVENGERS: ENDGAME (4K Ultra HD)", "Movies", 24.96, 149);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("John Wick: Chapter 3 (Blu-Ray)", "Movies", 19.96, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spider-Man: Far From Home", "Movies", 24.99, 151);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hydro Flask 32 oz. Wide Water Bottle", "Kitchen", 29.95, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lodge Skillet", "Kitchen", 4.99, 1100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kitchen IQ Edge Grip 2 Stage Knife Sharpener", "Kitchen", 5.99, 30);