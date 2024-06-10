var express = require("express");
var router = express.Router();

var usbController = require("../controllers/usbController");

router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /usb/cadastrar
    usbController.cadastrar(req, res);
});

router.get("/listarUsbs/:idMaquina", function (req, res) {
    // função a ser chamada quando acessar /usb/listar
    usbController.buscarUsbs(req, res);
});

router.get("/listarUsbsBloqueados/:idMaquina", function (req, res) {
    // função a ser chamada quando acessar /usb/listar
    usbController.buscarUsbsBloqueados(req, res);
});

router.put("/atualizarUsbDescricao/:idDispositivo", function (req, res) {
    usbController.atualizarUsbDescricao(req, res);
});

router.put("/atualizarUsbMotivoBloqueio/:idBlockList", function (req, res) {
    usbController.atualizarUsbMotivoBloqueio(req, res);
});

router.delete("/deletarUsbBloqueado/:idBlockList", function (req, res) {
    usbController.deletarUsbBloqueado(req, res);
});

module.exports = router;