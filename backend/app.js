const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();

mongoose
  .connect(
    "mongodb+srv://igorlira:1234@cluster0.w4vorhm.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database!"))
  .catch(() => console.log("Not connected"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

app.set("port", 3000);

module.exports = app;
