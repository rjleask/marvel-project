const router = require("express").Router();
const homeRoute = require("./home");

router.use("/home", homeRoute);
module.exports = router;
