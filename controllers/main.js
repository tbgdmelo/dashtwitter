const express = require('express');

const Tweets = require('../models/tweets');
const Trending = require('../models/trending');

function top10(trending){
    var result = [ ];
    for(var i = 0; i < 20 && i < trending.length; ++i){
        result.push(trending[i]);
    }
    console.log(result);
    return result;
}

async function index(req,res){
    try{
        const trending = await Trending.findOne().sort({horario_coleta: -1});
        res.render("main/home",{titulo:"Dashboard Twitter",
         trending: top10(trending.trending[0]['trends']),
         coleta: trending.horario_coleta
        } );
    }
    catch (e){
        res.send(e);
    }
}

async function sobre(req,res){
    try{
        const tweets = await Tweets.find();
                
        res.render("main/sobre",{titulo:"Sobre", tts: tweets});
    }
    catch (e){
        res.send(e);
    }
}

async function nuvem(req,res){
    res.render("main/nuvem",{titulo:"Nuvem de Palavras"});
}

async function analise(req,res){
    res.render("main/analise",{titulo:"Análise de Tweet"});
}

async function graficos(req,res){
    res.render("main/graficos",{titulo:"Gráficos"});
}

module.exports = { index, sobre, nuvem, analise, graficos };