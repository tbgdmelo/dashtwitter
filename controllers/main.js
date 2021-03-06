const express = require('express');

const Tweets = require('../models/tweets');
const Trending = require('../models/trending');
const Analise = require('../models/analise');

function tops20(trending){
    var result = [ ];
    for(var i = 0; i < 20 && i < trending.length; ++i){
        result.push(trending[i]);
    }
    return result;
}

function tops50(trending){
    var result = [ ];
    for(var i = 0; i < 50 && i < trending.length; ++i){
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

        const trending = await Trending.findOne().sort({horario_coleta: -1});

        const analises = await Analise.findOne().sort({analisado: -1});

        res.render("main/home",{titulo:"Dashboard Twitter",
         trending: tops20(trending.trending[0]['trends']),
         trending1: tops50(trending.trending[0]['trends']),
         coleta: trending.horario_coleta,
         total_tweets: countTweets(tweets),
         hashtags: countHashtags(tweets),
         analises: analises.analises
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


const {spawn} = require('child_process');
async function nuvem(req,res){
    const tweets2 = await Tweets.find().sort({coleta: 1}).limit(5);
    //
    var nuvem = gerarNuvem(tweets2);
    console.log(nuvem)

    var dataToSend = nuvem;
    
    const python = spawn('python', ['public/images/cloud.py', nuvem]);

    python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });

    res.render("main/nuvem",{titulo:"Nuvem de Palavras"});
}

async function analise(req,res){
    if(req.route.methods.get){
        res.render("main/analise",{titulo:"An??lise de Tweet"});
    }
    else if(req.route.methods.post){
        const tweet = req.body.textoTweet;
    
        const python = spawn('python', ['public/pythonfiles/analisar.py', tweet]);

        python.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });

    }
}

async function graficos(req,res){
    var tema = req.params.tema;
    const analises = await Analise.findOne().sort({analisado: -1});
    
    let positivo = 0;
    let negativo = 0;
    let total = 0;
    let dataAnalisado = '';

    for(var i = 0; i < 50 && i < analises.analises.length; ++i){
       
        if(analises.analises[i].tema.includes(tema)){
            positivo = analises.analises[i].qt_pos;
            negativo = analises.analises[i].qt_neg;
            total = analises.analises[i].total;
            dataAnalisado = analises.analises[i].executado;
            i=51;
       }
    }

    const analisesTodos = await Analise.find().limit(4).sort({analisado: -1});

    
    let positivo1 = 0;
    let negativo1 = 0;
    let total1 = 0;
    let dataAnalisado1 = '';

    for(var i = 0; i < 50 && i < analisesTodos[1].analises.length; ++i){
       
        if(analisesTodos[1].analises[i].tema.includes(tema)){
            positivo1 = analisesTodos[1].analises[i].qt_pos;
            negativo1 = analisesTodos[1].analises[i].qt_neg;
            total1 = analisesTodos[1].analises[i].total;
            dataAnalisado1 = analisesTodos[1].analises[i].executado;
            i=51;
       }
    }


    let positivo2 = 0;
    let negativo2 = 0;
    let total2 = 0;
    let dataAnalisado2 = '';

    for(var i = 0; i < 50 && i < analisesTodos[2].analises.length; ++i){
       
        if(analisesTodos[2].analises[i].tema.includes(tema)){
            positivo2 = analisesTodos[2].analises[i].qt_pos;
            negativo2 = analisesTodos[2].analises[i].qt_neg;
            total2 = analisesTodos[2].analises[i].total;
            dataAnalisado2 = analisesTodos[2].analises[i].executado;
            i=51;
       }
    }


    let positivo3 = 0;
    let negativo3 = 0;
    let total3 = 0;
    let dataAnalisado3 = '';

    for(var i = 0; i < 50 && i < analisesTodos[3].analises.length; ++i){
       
        if(analisesTodos[3].analises[i].tema.includes(tema)){
            positivo3 = analisesTodos[3].analises[i].qt_pos;
            negativo3 = analisesTodos[3].analises[i].qt_neg;
            total3 = analisesTodos[3].analises[i].total;
            dataAnalisado3 = analisesTodos[3].analises[i].executado;
            i=51;
       }
    }

    
    res.render("main/graficos",{titulo:"Gr??ficos de "+tema,
        tema: tema,
        positivo: positivo,
        negativo: negativo,
        total: total,
        dataAnalisado: dataAnalisado,
        ano: dataAnalisado.slice(6,10),
        dia: dataAnalisado.slice(3,5),
        mes: dataAnalisado.slice(0,2),
        hora: dataAnalisado.slice(12,14),
        minuto: dataAnalisado.slice(15,17),

        positivo1: positivo1,
        negativo1: negativo1,
        total1: total1,
        dataAnalisado1: dataAnalisado1,
        ano1: dataAnalisado1.slice(6,10),
        dia1: dataAnalisado1.slice(3,5),
        mes1: dataAnalisado1.slice(0,2),
        hora1: dataAnalisado1.slice(12,14),
        minuto1: dataAnalisado1.slice(15,17),

        positivo2: positivo2,
        negativo2: negativo2,
        total2: total2,
        dataAnalisado2: dataAnalisado2,
        ano2: dataAnalisado2.slice(6,10),
        dia2: dataAnalisado2.slice(3,5),
        mes2: dataAnalisado2.slice(0,2),
        hora2: dataAnalisado2.slice(12,14),
        minuto2: dataAnalisado2.slice(15,17),

        positivo3: positivo3,
        negativo3: negativo3,
        total3: total3,
        dataAnalisado3: dataAnalisado3,
        ano3: dataAnalisado3.slice(6,10),
        dia3: dataAnalisado3.slice(3,5),
        mes3: dataAnalisado3.slice(0,2),
        hora3: dataAnalisado3.slice(12,14),
        minuto3: dataAnalisado3.slice(15,17),
    });
}

module.exports = { index, sobre, nuvem, analise, graficos };