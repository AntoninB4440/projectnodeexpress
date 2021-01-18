var express = require('express');
var bodyParser = require('body-parser');
const db = require('./app/models/db')
const lessons = require('./app/routers/lesson.router');
const students = require('./app/routers/student.router');
const users = require('./app/routers/user.router');
const teachers = require('./app/routers/teacher.router')
const publications = require('./app/routers/publication.router');
const comments = require('./app/routers/comment.router');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/lessons', lessons);
app.use('/students', students);
app.use('/users', users);
app.use('/teachers', teachers);
app.use('/publications' , publications);
app.use('/comments' , comments);


db.sequelize.sync();

app.listen(8080);