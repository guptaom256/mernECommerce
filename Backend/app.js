const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

// Config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "Backend/config/config.env" });
  }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js");
const order = require("./routes/orderRoute.js");
const payment = require("./routes/paymentRoute.js");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;