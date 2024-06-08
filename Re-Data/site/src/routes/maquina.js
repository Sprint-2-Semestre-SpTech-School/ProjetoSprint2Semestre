var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/buscarDados/:idMaquina", function (req, res) {
    maquinaController.buscarDados(req, res);
});

router.get("/buscarDadosVolume/:idMaquina", function (req, res) {
    maquinaController.buscarDadosVolume(req, res);
});

router.get("/buscarDadosHardware/:idMaquina", function (req, res) {
    maquinaController.buscarDadosHardware(req, res);
});

router.get("/buscarDadosAlerta/:idMaquina", function (req, res) {
    maquinaController.buscarDadosAlerta(req, res);
});

router.get("/buscarDadosAlertaRam/:idMaquina", function (req, res) {
    maquinaController.buscarDadosAlertaRam(req, res);
});

module.exports = router;