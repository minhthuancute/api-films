require("dotenv").config();
require("./config/connectMongo");

// import files
const catchError = require("./middlewares/error");
const { limiter } = require("./middlewares/rateLimit");

// routes
const filmRoutes = require("./routes/filmRoutes");
// const userRoutes = require("./routes/userRoutes");
const ktRoutes = require("./routes/ktRoutes");

const { basicAuth } = require("./middlewares/basicAuth");

// import package
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

// Endpoints
app.use("/api/v1/film", filmRoutes);
app.use("/api/v1/auth", ktRoutes);
app.use(catchError);

app.listen(process.env.PORT, () => {
  console.log("Server is running on " + process.env.PORT);
});
