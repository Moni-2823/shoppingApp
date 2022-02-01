const { userProfileModel } = require('../models/userProfileModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saveUserDetailsToDb } = require('../extraFunction/saveUserDetailsToDb');

let signup = async (data) => {
        try {
            var checkEmailExist = await userProfileModel.findOne({email: data.email})
            if(checkEmailExist) {
                return ({code: 404, msg: 'this user already exist,try for new email'})
            }
            var token = jwt.sign({email: data.email},'abc123',{ expiresIn: '1h' });
            let salt = await bcrypt.genSalt(4);
            var passwordHash = await bcrypt.hash(data.password,salt);
            data.password = passwordHash
            data.token = token
            var updateTokenToDb = await saveUserDetailsToDb(data)
            if(updateTokenToDb) {
                return ({code: 200, data: updateTokenToDb});
            }
            console.log('details and token has issue');
            return({code: 404, msg: 'details not saved'});
        } catch(e) {
            console.log('something wrong:::::',e);
        }
}

let login = async (data) => {
    console.log("login",data)
    try { 
        var searchEmailInDb = await userProfileModel.findOne({email: data.email});
        if(!searchEmailInDb) {
            console.log("user is not registed ");
            return({code: 404, msg:'first signup then login again'})
        }
        var bcryptedPassword = await bcrypt.compare(data.password,searchEmailInDb.password);
        if(bcryptedPassword == false) {
            console.log('password not matched');
            return({code: 404, msg: 'password did not matched'})
        }
        console.log('email and password matched');
        var token = jwt.sign({email: data.email},'abc123');
        var changeTokenInDb = await userProfileModel.findOneAndUpdate({email: data.email},{$set: {token: token}},{new: true});
        if(!changeTokenInDb) {
            console.log('token not changed in db');
            return({code: 404, msg:'token not changed in db'})
        }
        return({code: 200,  data: changeTokenInDb})
    } catch(e) {
        console.log('something getting wrong',e);
    }
}

let updateAccount = async (data) => {
    try {
        var updatingUserDetails = await userProfileModel.findOneAndUpdate({email: data.email},{$set: data},{new: true});
        if(!updatingUserDetails) {
            return ({code: 404, msg: 'your account details did not updated '})
        }
        return ({code: 200,data: updatingUserDetails})
    } catch(err) {
        console.log('occuring error',err);
    }
}

let deleteAccount = async (data) => {
    try {
        var deletingUserAcc = await userProfileModel.findOneAndRemove({email: data.email});
        if(!deletingUserAcc) {
            return ({code: 404, msg: 'your account did not deleted'});
        }
        return ({code: 200, msg: 'your account has been deleted..........'});
    } catch(err) {
        console.log('having issue to delete account',err);
    }
}

module.exports = {login, signup, updateAccount, deleteAccount};