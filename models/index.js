const mongoose = require('mongoose');

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

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;