const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users');
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(8080, () => {
    console.log("App is listening on http://localhost:8080/");
})