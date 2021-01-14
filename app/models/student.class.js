class Student{
    constructor(id,first_name,last_name,bio,level,birthdate,age,profile_picture){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.bio = bio;
        this.level = level;
        this.birthdate = birthdate;
        this.age = age;
        this.profile_picture = profile_picture;
    }
}

module.exports = Student;