
/*Use the query below to create table structured according to the given schema in the test csv file.*/
/*Also change the pool config in index.js at line 19*/
CREATE TABLE orders(Region VARCHAR(50),Country VARCHAR(50),Item_Type VARCHAR(50),Sales_Channel VARCHAR(50),Order_Priority CHAR(1),Order_Date VARCHAR(50),Order_ID BIGINT,Ship_Date VARCHAR(50),Units_Sold INTEGER,Unit_Price FLOAT,Unit_Cost FLOAT,Total_Revenue FLOAT,Total_Cost FLOAT,Total_Profit FLOAT);