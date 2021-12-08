const mongoose = require('../database/index');

const TweetsSchema = new mongoose.Schema({
    id:{
        type: String
    },
    tema:{
        type: String
    },
    tweet:{
        type: Array
    }
});

const Tweets = mongoose.model('tweet', TweetsSchema);

module.exports = Tweets;