const { userProfileModel } = require('../models/userProfileModel');

function saveUserDetailsToDb(details) {
    return new Promise((resolve,reject) => {
        var userDetails = new userProfileModel(details)
        userDetails.save().then((doc) => {
            // console.log('profile details saved ',userDetails);
            resolve(doc);
        }).catch(e => {
            reject(e);
        })
    })
}
module.exports = { saveUserDetailsToDb };