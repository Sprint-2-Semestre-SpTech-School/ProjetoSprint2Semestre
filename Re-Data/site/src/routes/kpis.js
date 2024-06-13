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
router.get("/getDadosKpiEventosCriticosCpu20Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosCpu20Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosCpu40Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosCpu40Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosCpu60Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosCpu60Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosRam20Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosRam20Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosRam40Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosRam40Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosRam60Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosRam60Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosDisco20Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosDisco20Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosDisco40Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosDisco40Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosDisco60Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosDisco60Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosRede20Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosRede20Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosRede40Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosRede40Seg(req, res);
});

router.get("/getDadosKpiEventosCriticosRede60Seg/:idProjeto", function (req, res) {
    kpisController.getDadosKpiEventosCriticosRede60Seg(req, res);
});

router.get("/getDadosKpiTotalCapturasProjeto/:idProjeto", function (req, res) {
    kpisController.getDadosKpiTotalCapturasProjeto(req,res);
});

router.get("/getDadosProjeto/:idProjeto", function (req, res) {
    kpisController.getDadosProjeto(req,res);
});

module.exports = router;