var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashProjetoController");

router.get("/getDadosDash/:idProjeto", function (req, res) {
    dashboardController.getDadosDash(req, res);
});

router.post("/adicionarMaquina", function (req, res) {
    dashboardController.adicionarMaquina(req, res);
});

router.get("/:idProjeto", function (req, res) {
    dashboardController.buscarMaquinasPorProjeto(req, res);
});

router.get("/buscaridMaquina", function (req, res) {
    dashboardController.buscarIdMaquina(req, res);
});

module.exports = router;