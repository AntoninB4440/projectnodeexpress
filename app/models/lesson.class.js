class Lesson{
    constructor(id,title,hours,description,file_name,starting_date,ending_date,is_finished){
        this.id = id;
        this.title = title;
        this.hours = hours;
        this.description = description;
        this.file_name = file_name;
        this.starting_date = starting_date;
        this.ending_date = ending_date;
        this.is_finished = is_finished;
    }

    static fromJson(jsonData) {
        //console.log("inside method");
        //console.log(jsonData);
        return new this(jsonData.id,
            jsonData.title,
            jsonData.hours,
            jsonData.description,
            jsonData.file_name,
            jsonData.starting_date,
            jsonData.ending_date,
            jsonData.is_finished
        )
    }

}

module.exports = Lesson;