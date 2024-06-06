var express = require("express");
var router = express.Router();

var usbController = require("../controllers/usbController");

router.post("/cadastrar", function (req, res) {
    usbController.cadastrar(req, res);
});



module.exports = router;
