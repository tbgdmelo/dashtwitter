
async function index(req,res){
    res.render("main/home",{titulo:"Dashboard Twitter"});
}


async function sobre(req,res){
    res.render("main/sobre",{titulo:"Sobre"});
}

module.exports = { index, sobre };