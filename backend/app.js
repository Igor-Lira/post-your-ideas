const express = require("express");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Acess-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Acess-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "12312fdsaf",
      title: "First server-side post",
      content: "First server-side content",
    },
    {
      id: "23421234asdf",
      title: "Second server-side post",
      content: "Second server-side content",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

app.set("port", 3000);

module.exports = app;
