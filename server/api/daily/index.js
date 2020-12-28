const express = require("express");
const router = express.Router();
const ctrl = require("./daily.ctrl");

router.get("/:id", ctrl.show);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.destroy);
router.put("/:id", ctrl.update);
router.put("/:id/song", ctrl.updateSong);

module.exports = router;