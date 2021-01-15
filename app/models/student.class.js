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

    static fromJson(data){
        this.id = data.id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.bio = data.bio;
        this.level = data.level;
        this.birthdate = data.birthdate;
        this.age = data.age;
        this.profile_picture = data.profile_picture;
    }
}

module.exports = Student;