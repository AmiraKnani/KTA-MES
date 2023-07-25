const express = require("express")
const router = express.Router()

const postsController = require("../controller/posts.controller")

//Users
router.post("/users", postsController.getAllU)
router.post("/userAdd", postsController.createU)
router.put("/:email", postsController.updateU)

//TRS
router.get("/count", postsController.getCount)
router.get("/TRS", postsController.getAvgTrs)
router.get("/TD", postsController.getAvgTd)
router.get("/TP", postsController.getAvgTp)
router.get("/TQ", postsController.getAvgTq)
router.get("/TRG", postsController.getAvgTrg)
router.get("/Poste", postsController.getPoste)
router.get("/Matin", postsController.getMatin)
router.get("/Soir", postsController.getSoir)
router.get("/Nuit", postsController.getNuit)
router.get("/Jour", postsController.getJour)


router.get("/:Poste", postsController.getById)

//router.put("/:id", postsController.update)
router.delete("/:id", postsController.delete)


module.exports = router