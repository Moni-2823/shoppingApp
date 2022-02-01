const express = require('express');
const { signup , login , updateAccount , deleteAccount } = require('../controllers/userRouteController');
const { middleware } = require('./../middleware');

var app = express();


app.post('/userSignup', async(req,res) => {
    if(Object.keys(req.body).length == 0) {
        console.log('user does not have sufficiant details to signup');
        return res.status(400).send({msg: 'you have insufficient details to signup'});
    }
    let savingUserDetails = await signup(req.body);
    if(savingUserDetails.code == 200) {
        console.log('user details saved to db>>>>>>>>>>',savingUserDetails);
        return res.status(savingUserDetails.code).send({data: savingUserDetails.data});
    }
    console.log('details has some issue')
    res.status(savingUserDetails.code).send({msg: savingUserDetails.msg});
})

app.get('/userLogin',async (req,res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details to login');
            return res.status(400).send({msg: 'you have insufficient details to login'});
        }
        if(!req.body.email || !req.body.password) {
            return res.status(400).send("please provide email and password")
        }
        let loginUserProfile = await login(req.body)
        if (loginUserProfile.code == 200) {
            console.log("user logged in successfully",loginUserProfile)
            return res.status(loginUserProfile.code).send({msg: 'you logged in successfully',data: loginUserProfile.data})
        }
        res.status(loginUserProfile.code).send({msg: loginUserProfile.msg})
    } catch(e) {
        console.log('something wrong',e);
    }
})


app.patch('/updateUserAccount',middleware, async (req, res) => {
    if(Object.keys(req.body).length == 0) {
        console.log('user does not have sufficiant details to update account');
        return res.status(400).send({msg: 'come with proper details to update your account'});
    }
    let updatingUserAccount = await updateAccount(req.body)
    if(updatingUserAccount.code == 200) {
        console.log('user account details updated');
        return res.status(updatingUserAccount.code).send({msg: 'your accout details updated successfully',data: updatingUserAccount.data});
    }
    console.log('user details did not updated');
    res.status(updatingUserAccount.code).send({msg: updatingUserAccount.msg});
})


app.get('/deleteUserAccount',middleware, async (req, res) => {
    if(Object.keys(req.body).length == 0) {
        console.log('user does not have sufficiant details to delete account');
        return res.status(400).send({msg: 'come with proper details to delete your account'});
    }
    let deletingAccount = await deleteAccount(req.body);
    if(deletingAccount.code == 200) {
        console.log('user account has been deleted successfully');
        return res.status(deletingAccount.code).send({msg: deletingAccount.msg});
    }
    console.log('your account did not deleted yet')
    return res.status(deletingAccount.code).send({msg: deletingAccount.msg});
})

module.exports = app;