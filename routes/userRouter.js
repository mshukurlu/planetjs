const express = require("express")

const userController = require("../app/http/controllers/api/v1/userController")

const router = express.Router();
//const auth = require('../auth/jwtAuth')

router.get("/",userController.index);
router.post("/",userController.store)
router.put("/:id",userController.update)
router.delete("/:id",userController.delete)
module.exports = router;