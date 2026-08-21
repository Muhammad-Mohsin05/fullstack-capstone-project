const express = require("express");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(express.json());

app.use("/api/search", searchRoutes);

module.exports = app;
