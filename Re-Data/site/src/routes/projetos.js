var express = require("express");
var router = express.Router();

var projetosController = require("../controllers/projetosController");

router.post("/cadastrarProjeto", function (req, res) {
    projetosController.cadastrarProjeto(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    projetosController.buscarProjetosPorEmpresa(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    projetosController.listarProjetoPorEmpresa(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    projetosController.qtdMaquinasPorProjeto(req, res);
});

router.put("/editarProjeto/:idProjeto", function (req, res) {
    projetosController.editarProjeto(req, res);
});

router.get("/:idProjeto", function (req, res) {
    projetosController.entrarDashProjeto(req, res);
});

router.get("/buscaridProjeto", function (req, res) {
    projetosController.buscarIdProjeto(req, res);
});

router.delete("/deletarProjeto/:idProjeto", function (req, res) {
    projetosController.deletarProjeto(req, res);
});

module.exports = router;