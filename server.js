const express = require('express');
const bodyParser = require('body-parser');

var app = express();
require('./databaseConnection/db');
const {user, product} = require('./routes/index');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(user);
app.use(product);

var port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`server is upon ${port}`);
})