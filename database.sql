DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat food", "pets", 8, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skittles", "candy", 2, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sweater", "clothes", 25, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 1000, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headphones", "electronics", 20, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cookies", "food", 5, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kit kat", "candy", 2, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat litter", "pets", 5, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cookies", "food", 5, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothes", 20, 85);