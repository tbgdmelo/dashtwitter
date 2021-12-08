const express = require('express');

const Tweets = require('../models/tweets');
const Trending = require('../models/trending');

function top10(trending){
    var result = [ ];
    for(var i = 0; i < 20 && i < trending.length; ++i){
        result.push(trending[i]);
    }
    return result;
}

function countTweets(tweets){
    var result = 0;
    for(var i=0; i<tweets.length; i++){
        for(var j=0; j<tweets[i]['assunto_tweets'].length; j++){
            result=result+tweets[i]['assunto_tweets'][j]['tweet'].length;
        }
    }
    return result;
}

function countHashtags(tweets){
    var result = 0;
    for(var i=0; i<tweets.length; i++){
        for(var j=0; j<tweets[i]['assunto_tweets'].length; j++){
            if(tweets[i]['assunto_tweets'][j]['tema'].includes('#') ){
                result=result+1;
            }
        }
    }
    return result;
}

function gerarNuvem(tweets){
    var palavras=""
    for(var i=0; i<tweets.length; i++){
        for(var j=0; j<tweets[i]['assunto_tweets'].length; j++){
            palavras=palavras+tweets[i]['assunto_tweets'][j]['tema'];
            palavras=palavras+" ";
        }
    }
    return palavras;
}

async function index(req,res){
    try{
        const tweets = await Tweets.find();

        const trending = await Trending.find().sort({horario_coleta: -1}).limit(5);

        res.render("main/home",{titulo:"Dashboard Twitter",
         trending: top10(trending.trending[0]['trends']),
         coleta: trending.horario_coleta,
         total_tweets: countTweets(tweets),
         hashtags: countHashtags(tweets)
        } );
    }
    catch (e){
        res.send(e);
    }
}

async function sobre(req,res){
    try{                
        res.render("main/sobre",{titulo:"Sobre"});
    }
    catch (e){
        res.send(e);
    }
}

async function nuvem(req,res){
    const tweets = await Tweets.find().sort({coleta: -1}).limit(5);
    
    var nuvem = gerarNuvem(tweets);

    console.log(nuvem);

    res.render("main/nuvem",{titulo:"Nuvem de Palavras"});
}

async function analise(req,res){
    res.render("main/analise",{titulo:"Análise de Tweet"});
}

async function graficos(req,res){
    res.render("main/graficos",{titulo:"Gráficos"});
}

module.exports = { index, sobre, nuvem, analise, graficos };