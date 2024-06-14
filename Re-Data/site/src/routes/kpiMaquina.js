var express = require("express");
var router = express.Router();

var kpiMaquinaController = require("../controllers/kpiMaquinaController");

router.get("/kpiMaquinaLeituras/:idMaquina/:idProjeto", function (req, res) {
    kpiMaquinaController.kpiMaquinaLeituras(req, res);
});

router.get("/kpiMaquinaCpu/:idMaquina/:idProjeto", function (req, res) {
    kpiMaquinaController.kpiMaquinaCpu(req, res);
});

router.get("/kpiMaquinaRam/:idMaquina/:idProjeto", function (req, res) {
    kpiMaquinaController.kpiMaquinaRam(req, res);
});

module.exports = router;