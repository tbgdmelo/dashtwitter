const handlebars = require('express-handlebars');

function totalTT(valor){
    if(valor!=null){
        return valor;
    }
    else{
        return "Indefinido"
    }
}

function verificaSentimento(sentiment){
    if(sentiment === 'Positivo'){
        return "thumbs-up";
    }
    else if(sentiment === 'Negativo'){
        return "thumbs-down";
    }
    else{
        return "ellipsis-h";
    }
}

function verificaTema(nome, analise){
    if(nome===analise){
        return true
    }
    else{ return false}
}

function tratarHashtag(tema){
    if(tema.includes("#") ){
        //remove a hashtag para criar uma rota valida
        return tema.substr(1);
    }
    else{
        return tema;
    }
}

function verificaAnalise(analises, tema){
    var valor="";
    analises.forEach(analise => {
        if(analise.tema===tema){
            //console.log(analise.tema)
            //console.log(analise.sentiment)
            if(analise.sentiment === 'Positivo'){
                valor=  "fas fa-thumbs-up";
            }
            else if(analise.sentiment === 'Negativo'){
                valor= "fas fa-thumbs-down";
            }
        }
    });
    //console.log(valor)
    if(valor===""){
        //o tema n tem analise
        return "fas fa-ellipsis-h";
    }
    else{
        return valor;
    }
    
}
module.exports= { totalTT, verificaSentimento, verificaTema, tratarHashtag, verificaAnalise }