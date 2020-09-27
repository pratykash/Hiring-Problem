const express = require("express"); //Importing Express Framework
const app = express();
const morgan = require("morgan"); // Importing Morgan Framework for Logging
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
const Pool = require("pg").Pool; // Importing PostgreSQL

// Function to insert the csv rows into the table
const insertCSV = async (query) => {
    const pool = new Pool({
        host: "localhost", // CHANGE ACCORDINGLY
        user: "Pratyaksh", // CHANGE ACCORDINGLY
        database: "Pratyaksh", // CHANGE ACCORDINGLY
        password: "", // CHANGE ACCORDINGLY
        port: 5432 // CHANGE ACCORDINGLY
    });

    // PostgreSQL call
    await pool.query(query, (err, res) => {
        console.log(err, res);
        pool.end();
    })
};

// Setting the view to ejs file
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 

app.get("/",function(req,res){ 
    res.render("index"); 
})

// middleware
app.use(morgan("dev")); // Using morgan to log server 

app.use((req, res, next) => {
    console.log("This is the middleware");
    next();
});

app.post("/csvapi/v1", async (req, res) => {
    // Building the query to be perormed in PostgreSQL
    // PLEASE CHANGE THE FILEPATH ACCORDING TO YOUR SERVER DIRECTORY STRUCTURE BELOW
    query = "COPY orders (region, country, item_type, sales_channel, order_priority, order_date, order_id, ship_date, units_sold, unit_price, unit_cost, total_revenue, total_cost, total_profit) FROM '/Users/Pratyaksh/code/node/project/test.csv' DELIMITER ',' CSV HEADER;";
    
    let prom = await insertCSV(query); // Call to InsertCSV method

    // Returning back the status
    res.status(200).json({
        Done: "CSV Data has been entered into the PostgreSQL Database."
    });
});

app.listen(port, () => {
    console.log("Server is up and listening to port 3000");
});