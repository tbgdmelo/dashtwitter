const mongoose = require('../database/index');

const TweetsSchema = new mongoose.Schema({
    id:{
        type: String
    },
    assuntos_tweets:{
        type: Array
    },
    coleta:{
        type: String
    }
});

const Tweets = mongoose.model('tweet', TweetsSchema);

module.exports = Tweets;