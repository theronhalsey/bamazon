CREATE TABLE inventory (
  ID int IDENTITY(1,1) PRIMARY KEY,
  item_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT default 0,
  stock INT default 0,
);

INSERT INTO testDB.dbo.inventory VALUES ('Elder Wand', 'Witchcraft & Wizardry', 50, 1);
INSERT INTO testDB.dbo.inventory VALUES ('Wing Zero', 'Humanoid Robot', 50000000, 1);
INSERT INTO testDB.dbo.inventory VALUES ('Super Nintendo', 'Video Games', 250, 30);
INSERT INTO testDB.dbo.inventory VALUES ('Levis 527 Jeans', 'Mens Apparel', 65, 10);
INSERT INTO testDB.dbo.inventory VALUES ('Pint of animal blood', 'Collectables', 50, 30);
INSERT INTO testDB.dbo.inventory VALUES ('Soy Milk', 'Grocery', 5, 100);
INSERT INTO testDB.dbo.inventory VALUES ('Two tickets to paradise', 'Travel', 500, 1);
INSERT INTO testDB.dbo.inventory VALUES ('rock, large', 'Lawn & Garden', 25, 200);
INSERT INTO testDB.dbo.inventory VALUES ('Steppenwolfs Greatest Hits (cassette)', 'Music & Movies', 8, 1000);
INSERT INTO testDB.dbo.inventory VALUES ('Sarah Huckabee Sanders integrity', 'Seasonal', 11, 1);
INSERT INTO testDB.dbo.inventory VALUES ('mySpace', 'Computers', 62, 1);
INSERT INTO testDB.dbo.inventory VALUES ('Noozles, complete series (HD-DVD)', 'Music & Movies', 32, 20);