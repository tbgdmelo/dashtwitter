const express = require('express');

const Tweets = require('../models/tweets');
const Trending = require('../models/trending');

async function index(req,res){
    try{
        const trending = await Trending.find();     
        res.render("main/home",{titulo:"Dashboard Twitter", trending:trending});
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