let Lesson = require('../models/lesson.class');

exports.checkIfFinished = lesson => {
    let now = new Date();
    if (now > lesson.ending_date){
        let checkedLesson = new Lesson(lesson.id,lesson.title,lesson.hours,lesson.description,lesson.file_name,lesson.starting_date,lesson.ending_date,true)
        return checkedLesson;
    } else {
        let checkedLesson = new Lesson(lesson.id,lesson.title,lesson.hours,lesson.description,lesson.file_name,lesson.starting_date,lesson.ending_date,false)
        return checkedLesson;
    }
}