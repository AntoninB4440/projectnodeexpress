class Teacher{
    constructor(id,first_name,last_name,bio,subject,profile_picture){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.bio = bio;
        this.subject = subject;
        this.profile_picture = profile_picture;
    }

    static fromJson(jsonData) {
        //console.log("inside method");
        //console.log(jsonData);
        return new this(jsonData.id,
            jsonData.first_name,
            jsonData.last_name,
            jsonData.bio,
            jsonData.subject,
            jsonData.profile_picture
        )
    }
}

module.exports = Teacher;