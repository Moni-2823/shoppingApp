const mongoose = require('mongoose');
let dbURI = 'mongodb+srv://moni:moni123@cluster0.hcpdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// let dbURI = 'mongodb://127.0.0.1/shopForTrendyCollection' 

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true },(err,data) => {
    if(err) {
        return console.log('something wrong here',err);
    }
    console.log('connected to mongoose');
})

module.exports = { mongoose };