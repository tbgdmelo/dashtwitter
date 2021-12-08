var express = require('express');
const mainController = require("../controllers/main");
var router = express.Router();

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

router.get("/analise", mainController.analise);

router.get("/nuvem", mainController.nuvem);

//router.get("/graficos/:id", mainController.sobre);

module.exports = router;
