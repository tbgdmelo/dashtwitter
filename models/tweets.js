const mongoose = require('../database/index');

const TweetsSchema = new mongoose.Schema({
    id:{
        type: String
    },
    assunto_tweets:{
        type: Array
    },
    coleta:{
        type: String
    }
});

const Tweets = mongoose.model('tweet', TweetsSchema);

module.exports = Tweets;