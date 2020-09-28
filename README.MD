Packages to be imported:
express
morgan
pg
express-fileupload

Create DB in PostgreSQL and make a table using:
  CREATE TABLE orders(Region VARCHAR(50),Country VARCHAR(50),Item_Type VARCHAR(50),Sales_Channel VARCHAR(50),Order_Priority CHAR(1),Order_Date VARCHAR(50),Order_ID BIGINT,Ship_Date VARCHAR(50),Units_Sold INTEGER,Unit_Price FLOAT,Unit_Cost FLOAT,Total_Revenue FLOAT,Total_Cost FLOAT,Total_Profit FLOAT);

Before running server goto node.js and make necessary changes on lines:
  53-47 for PostgreSQL Pool
  92 for upload directory

Run index.js server and go to browser and type: localhost:3000 (or your own port)
