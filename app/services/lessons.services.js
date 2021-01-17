let Lesson = require('../models/lesson.class');

exports.checkFinished = (lesson) => {
    console.log("hey result");
    let ending_date = new Date(lesson.dataValues.ending_date).getTime();
    let now = Date.now();
    if (now > ending_date) {
        lesson.dataValues.is_finished = true;
        //console.log(lesson.dataValues);
        let reLesson =  Lesson.fromJson(lesson.dataValues);
        console.log(reLesson);
        return reLesson
    } else {
        lesson.dataValues.is_finished = false;
        let reLesson =  Lesson.fromJson(lesson.dataValues);
        return reLesson
    }
}
