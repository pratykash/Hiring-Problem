const express = require("express"); //Importing Express Framework
const app = express();
const morgan = require("morgan"); // Importing Morgan Framework for Logging
const port = process.env.PORT || 3000;
const multer = require("multer"); // Importing Multer to handle files via forms
const path = require("path");
const fs = require("fs");
const Pool = require("pg").Pool; // Importing PostgreSQL POOL
const fileupload = require('express-fileupload'); // Importing Express-Fileupload to upload files
const { resolve } = require("path");

// Multer 
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "uploads") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".csv") 
    } 
}) 

var query;

var upload = multer({  
    storage: storage, 
    limits: {  }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /csv/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
    }  
  
// myfile is the name of file attribute 
}).single("myCSV");

// Function to insert rows into table
const insertCSV = async (query) => {
    return new Promise((resolve, reject) => {
        const pool = new Pool({
            host: "localhost", // Change Accordingly
            user: "Pratyaksh", // Change Accordingly
            database: "Pratyaksh", // Change Accordingly
            password: "", // Change Accordingly
            port: 5432 // Change Accordingly
        });
    
        pool.query(query, async(err, res) => {
            await pool.end();
            console.log(res);
            resolve(res);
        })
    })
};

app.use(express.static(path.join(__dirname, '/views')));
app.set("view engine","ejs");

app.get("/",function(req,res){ 
    res.render("index"); 
})

// middleware
app.use(morgan("dev")); // Using morgan to log server 

app.use((req, res, next) => {
    console.log("This is da middleware");
    fileupload();
    next();
});

// Post handle for upload
app.post("/upload", async (req, res) => {

    let filepath;

    await upload(req,res,function(err) { 
        filepath = req.file.path;
        // MODIFY PATH IN BELOW userdir ACCORDING TO YOUR SERVER PATH
        let userdir = "/Users/Pratyaksh/code/node/Hiring\ Problem/";
        query = "COPY orders (region, country, item_type, sales_channel, order_priority, order_date, order_id, ship_date, units_sold, unit_price, unit_cost, total_revenue, total_cost, total_profit) FROM '" + userdir + filepath + "' DELIMITER ',' CSV HEADER;";
        console.log(query);
        if(err) { 
            res.send(err) 
        } 
        else { 
            // SUCCESS, image successfully uploaded 
            console.log("Success, CSV Uploaded!");
            res.send("Success, CSV uploaded!");
        } 
    }) 
});

// Post handle for csv import
app.post("/csvapi/v1", (req, res) => {
    insertCSV(query).then((result) => {
        console.log("" + result.rowCount + " rows were added into the table");
        res.send("" + result.rowCount + " rows were added into the table.");
    });
});

// Listening to port
app.listen(port, () => {
    console.log("Server is up and listening to port 3000");
});