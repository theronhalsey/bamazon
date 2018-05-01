DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE inventory(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT default 0,
  stock INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO inventory (item_name, department, price, stock) VALUES ("Elder Wand", "Witchcraft & Wizardry", 50, 1);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Wing Zero", "Humanoid Robot", 50000000, 1);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Super Nintendo", "Video Games", 250, 30);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Levi's 527 Jeans", "Men's Apparel", 65, 10);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Pint of (animal?) blood", "Collectables", 50, 30);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Soy Milk", "Grocery", 5, 100);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Two tickets to paradise (pair)", "Travel", 500, 1);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("rock (large)", "Lawn & Garden", 25, 200);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Steppenwolf's Greatest Hits (cassette)", "Music & Movies", 8, 1000);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Sarah Huckabee Sanders' integrity", "Seasonal", 11, 1);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("mySpace", "Computers", 62, 1);
INSERT INTO inventory (item_name, department, price, stock) VALUES ("Noozles, complete series (HD-DVD)", "Music & Movies", 32, 20);