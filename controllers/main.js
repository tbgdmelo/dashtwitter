
async function index(req,res){
    res.render("main/home",{titulo:"Inicio"});
}

module.exports = { index };