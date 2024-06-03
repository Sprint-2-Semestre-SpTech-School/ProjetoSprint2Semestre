var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashProjetoController");

router.get("/getDadosDash/:idProjeto", function (req, res) {
    dashboardController.getDadosDash(req, res);
});

module.exports = router;