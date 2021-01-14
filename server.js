var express = require('express');
var bodyParser = require('body-parser');
const db = require('./app/models/db')


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


db.sequelize.sync();

app.listen(8080);