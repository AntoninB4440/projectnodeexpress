var express = require('express');
var bodyParser = require('body-parser');
const db = require('./app/models/db')
//const lessons = require('./app/routers/lesson.router');
const students = require('./app/routers/student.router');
const users = require('./app/routers/user.router');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/lessons', lessons);
app.use('/students', students);
app.use('/users', users);


db.sequelize.sync();

app.listen(8080);