var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/buscarDados/:idMaquina", function (req, res) {
    maquinaController.buscarDados(req, res);
});

router.get("/buscarDadosVolume/:idMaquina", function (req, res) {
    maquinaController.buscarDadosVolume(req, res);
});

module.exports = router;