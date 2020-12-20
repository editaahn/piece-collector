const express = require("express");
const router = express.Router();
const ctrl = require("./color.ctrl");

router.get("/list", ctrl.list);

module.exports = router;