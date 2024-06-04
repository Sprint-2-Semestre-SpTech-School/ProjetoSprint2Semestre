var express = require("express");
var router = express.Router();

var kpisController = require("../controllers/kpisController");

router.get("/getDadosKpiCpuAlertas/:idProjeto", function (req, res) {
    kpisController.getDadosKpiCpuAlertas(req, res);
});

router.get("/getDadosKpiRamAlertas/:idProjeto", function (req, res) {
    kpisController.getDadosKpiRamAlertas(req, res);
});

router.get("/getDadosKpiDiscoAlertas/:idProjeto", function (req, res) {
    kpisController.getDadosKpiDiscoAlertas(req, res);
});

router.get("/getDadosKpiRedeAlertas/:idProjeto", function (req, res) {
    kpisController.getDadosKpiRedeAlertas(req, res);
});
// KPIS DE EVENTOS POR TEMPO
router.get("/getDadosKpiRedeAlertas/:idProjeto", function (req, res) {
    kpisController.getDadosKpiRedeAlertas(req, res);
});

module.exports = router;