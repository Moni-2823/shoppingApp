const {Schema , model} = require('mongoose');

const userProfileSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true},
    token: { type: String }
})
var userProfileModel = model('userProfileModel',userProfileSchema);
module.exports = { userProfileModel };