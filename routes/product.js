const express = require('express');
const { createPage,getPage,updatePage,deletePage } = require('../controllers/productRouteController');
var app = express();

app.post('/createProduct', async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user has insufficient details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }
        let savingProductDetails = await createPage(req.body)
        if(savingProductDetails.code == 200) {
            console.log('saved details is:::::',savingProductDetails);
            return res.status(savingProductDetails.code).send({msg: "product details saved sucessfully",data: savingProductDetails.data})
        }
        console.log('details not saved to db');
        return res.status(savingProductDetails.code).send({msg: savingProductDetails.msg});
    } catch(err) {
        console.log('something getting wrong ',err);
    }
})

app.get('/getProduct', async (req, res) => {
    try { 
        if(Object.keys(req.query).length == 0) {
            console.log('user has insufficient details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }
        let gettingProductDetails = await getPage(req.query.id);
        if(gettingProductDetails.code == 200) {
            console.log('product details is ...',gettingProductDetails);
            return res.status(gettingProductDetails.code).send({data: gettingProductDetails});
        }
        console.log('not found product details ');
        return res.status(gettingProductDetails.code).send({msg: gettingProductDetails.msg});
    } catch(err) {
        console.log('some error.....',err);
    }
})


app.patch('/updateProduct', async (req, res) => {
    try {
        if(Object.keys(req.query).length == 0) {
            console.log('user has insufficient details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }
        let updatingProductDetails = await updatePage(req.body);
        if(updatingProductDetails.code == 200) {
            console.log('product details updated sucessfully',updatingProductDetails);
            return res.status(updatingProductDetails.code).send({data: updatingProductDetails});
        }
        console.log('product details did not updated ');
        return res.status(updatingProductDetails.code).send({msg: updatingProductDetails.msg});
    } catch(err) {
        console.log('errorr foundddd',err);
    } 
})

app.post('/deleteProduct', async (req, res) => {
    try {
        if(Object.keys(req.query).length == 0) {
            console.log('user has insufficient details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }
        let deleteProductDetails = await deletePage(req.query.id); 
        if(deleteProductDetails.code == 200) {
            console.log('product details deleted sucessfully');
            return res.status(deleteProductDetails.code).send({msg: deleteProductDetails.msg});
        }
        console.log('product details not deleted');
        return res.status(deleteProductDetails.code).send({data: deleteProductDetails});
    } catch(err) {
        console.log('finding issue............',err);
    }
})
module.exports = app;
