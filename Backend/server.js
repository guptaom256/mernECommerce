const app = require("./app.js");
const connectDatabase = require("./config/database.js");
const cloudinary = require("cloudinary");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception!`);
  process.exit(1);
});

// Config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({ path: "Backend/config/config.env" });
}

// Connecting to DataBase
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection!`);

  server.close(() => {
    process.exit(1);
  });
});
