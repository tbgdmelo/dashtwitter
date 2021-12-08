const mongoose = require('../database/index');

const TrendingSchema = new mongoose.Schema({
    id:{
        type: String
    },
    horario_cole:{
        type: String
    },
    trending:{
        type: Array
    }
});

const Trending = mongoose.model('trending_topic', TrendingSchema);

module.exports = Trending;