const mongoose = require('../database/index');

const AnaliseSchema = new mongoose.Schema({
    id:{
        type: String
    },
    analisado:{
        type: String
    },
    analises:{
        type: Array
    }
});

const Analise = mongoose.model('analise', AnaliseSchema);

module.exports = Analise;