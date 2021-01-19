const express = require("express");
const router = express.Router();
const ctrl = require("./auth.ctrl");
const { isLoggedIn, isNotLoggedIn } = require("../../middlewares/checkLoggedIn.js");

router.post("/join", isNotLoggedIn, ctrl.join);
router.post("/login", isNotLoggedIn, ctrl.login);
// router.post("/logout", isLoggedIn, ctrl.logout);

module.exports = router;
