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
        return "smile";
    }
    else{
        return "frown";
    }
}

function verificaTema(nome, analise){
    if(nome===analise){
        return true
    }
    else{ return false}
}
module.exports= { totalTT, verificaSentimento, verificaTema }