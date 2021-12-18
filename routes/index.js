var express = require('express');
const mainController = require("../controllers/main");
var router = express.Router();

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

router.get("/analise", mainController.analise);

router.get("/nuvem", mainController.nuvem);

router.get("/graficos/:tema", mainController.graficos);

module.exports = router;
