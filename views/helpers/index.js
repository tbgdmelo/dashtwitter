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
        return "";
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
module.exports= { totalTT, verificaSentimento, verificaTema, tratarHashtag }