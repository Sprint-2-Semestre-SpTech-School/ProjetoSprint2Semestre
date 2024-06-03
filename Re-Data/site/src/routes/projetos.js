var express = require("express");
var router = express.Router();

var projetosController = require("../controllers/projetosController");

router.get("/:idEmpresa", function (req, res) {
    projetosController.buscarProjetosPorEmpresa(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    projetosController.listarProjetoPorEmpresa(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    projetosController.qtdMaquinasPorProjeto(req, res);
});

module.exports = router;