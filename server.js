const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());

const products = require("./routes/api/products");

//Bodyparser middleware
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected To MongoDB"))
  .catch(err => console.log(err));

//Routes
app.use("/api/products", products);

//Server Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running On Port ${port}...`));
