DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(35) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price float(9,2) NOT NULL,
    stock_quantity int NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Underware", "Clothing", "5.50", 15), ("underware", "Clothing", "5.50", 20),
	   ("Shirt", "Clothing", "7.25", 15), ("Hat", "Clothing", "15.55", 9), 
       ("Shoes", "Clothing", "35.25", 8), ("X-Box One", "Electronics", "299.99", 5),
       ("PS4", "Electronics", "349.99", 6), ("60 Inch 4K Plasma HDTV", "Electronics", "999.99", 2),
       ("iPhonr X", "Electronics", "1000", 0), ("Silly Putty", "Toy", "1.00", 1);