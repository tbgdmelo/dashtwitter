const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thiago:braga123melo@cluster1.teron.mongodb.net/dashboard?retryWrites=true&w=majority', {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;