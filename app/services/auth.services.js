const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

//Vérifie sur le token est valide
exports.verifyToken = async token => {
    console.log('verify ' + token);
    if (!token){
        console.log("No token found");
        return false;
    }

    try {
        let tokenVerified = await jwt.verify(token , config.secret);
        return tokenVerified.id;
    } catch(error){
        return false;
    }
}

exports.signToken = id => {
    let tokenSigned = jwt.sign({id : id }, config.secret, {
        expiresIn: 86400
    });

    return tokenSigned;
}