const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const config = require("config");

const app = express();
app.use(cors());

//Bodyparser middleware
app.use(express.json());

//DB Config
const db = config.get("mongoURI");

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected To MongoDB"))
  .catch(err => console.log(err));

//Routes
app.use("/api/products", require("./routes/api/products"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//Server Listen
const port = 5000;
app.listen(port, () => console.log(`Server Running On Port ${port}...`));
