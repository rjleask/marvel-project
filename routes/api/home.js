const router = require("express").Router();
// const marvelController = require("../../controllers/marvelController.js");

// router.route("/all").get(marvelController.getCharacters());
router.get("/first", function(req, res) {
  res.json({ message: "why the f isnt this working" });
});
module.exports = router;
