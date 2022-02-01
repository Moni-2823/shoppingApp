const { productModel } = require('./../models/productModel');

let createPage = async (data) => {
    try {
        var aboutProduct = new productModel(data);
        await aboutProduct.save();
        if(!aboutProduct) {
            return ({code: 404,msg: 'product details not saved to db,check again'});
        }
        return ({code: 200,data: aboutProduct});
    } catch(e) {
        console.log('having issue to save product details');
    }
}

let getPage = async (data) => {
    try {
        let getProductDetails = await productModel.findById({_id: data});
        if(getProductDetails) {
            return ({code: 200, data: getProductDetails});
        }
        return ({code: 404,msg: 'no product details found'});
    } catch (e) {
        console.log('something wrong',e);
    }
}

let updatePage = async (data) => {
    try {
        var updateProductDetails = await productModel.findOneAndUpdate({_id: data._id},{$set: data},{new: true})
        if(updateProductDetails) {
            return ({code: 200,data: updateProductDetails});
        }
        return ({code: 404,msg: 'having issue to update product details'});
    } catch(e) {
        console.log('some error....... ',e);
    }
}

let deletePage = async (data) => {
    console.log(".......",data)
    try {
        let deletingProductPage = await productModel.findOneAndRemove({_id: data})
        if(deletingProductPage) {
            return ({code: 200,data: deletingProductPage});
        }
        return ({code: 404,msg: 'product details not deleted '});
    } catch(e) {
        console.log('something wrong',e);
    }
}

module.exports = { createPage , getPage, updatePage, deletePage};