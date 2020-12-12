const express = require("express");
const router = express.Router();
const ctrl = require("./monthly.ctrl");

// GET /monthly?year=&month=
router.get("/", ctrl.index);

module.exports = router;
