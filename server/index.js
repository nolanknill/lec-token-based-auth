const express = require('express');
const app = express();
require("dotenv").config();

app.listen(8080, () => {
    console.log("App is listening on http://localhost:8080/");
})