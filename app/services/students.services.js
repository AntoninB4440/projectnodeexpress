exports.getYears = birthdate => {
    let years = new Date().getFullYear() - new Date(birthdate).getFullYear();
    let months = new Date().getMonth() - new Date(birthdate).getMonth();
    let daysDiff = new Date().getDay() - new Date(birthdate).getDay();

    if (daysDiff < 0){
        months -= 1;
    }

    if (months < 0){
        years -= 1;
    }

    return years;
}