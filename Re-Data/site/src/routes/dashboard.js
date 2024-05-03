var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarMaquinasAtivas/:idProjeto", function (req, res) {
    dashboardController.buscarMaquinasAtivas(req, res);
});

router.get("/buscarTempoOpTotal/:idProjeto", function (req, res) {
    dashboardController.buscarTempoOpTotal(req, res);
});

module.exports = router;