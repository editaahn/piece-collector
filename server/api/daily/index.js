const express = require("express");
const router = express.Router();
const ctrl = require("./daily.ctrl");

router.get("/:id", ctrl.show);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.destroy);

module.exports = router;