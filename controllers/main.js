
async function index(req,res){
    res.render("main/home",{titulo:"Dashboard Twitter"});
}


async function sobre(req,res){
    res.render("main/sobre",{titulo:"Sobre"});
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