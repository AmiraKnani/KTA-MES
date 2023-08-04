const express = require("express")
const router = express.Router()

const postsController = require("../controller/posts.controller")

//Users
router.post("/users", postsController.getAllU)
router.post("/userAdd", postsController.createU)
router.put("/update", postsController.updateU)
router.get("/checkU", postsController.checkU)

//TRS
router.get("/count", postsController.getCount)
router.get("/TRS", postsController.getAvgTrs)
router.get("/TD", postsController.getAvgTd)
router.get("/TP", postsController.getAvgTp)
router.get("/TQ", postsController.getAvgTq)
router.get("/TRG", postsController.getAvgTrg)
router.get("/Poste", postsController.getPoste)
router.get("/Operation", postsController.getOperation)
router.get("/OP", postsController.getOP)
router.get("/Matin", postsController.getMatin)
router.get("/Soir", postsController.getSoir)
router.get("/Nuit", postsController.getNuit)
router.get("/Jour", postsController.getJour)
router.get("/Semaine", postsController.getSemaine)
router.get("/Mois", postsController.getMois)
router.get("/getTp", postsController.getTp)
router.get("/getTp1", postsController.getTp1)
router.get("/getTq", postsController.getTq)
router.get("/getTq1", postsController.getTq1)
router.get("/getTrg", postsController.getTrg)
router.get("/getTrg1", postsController.getTrg1)
router.get("/getTre", postsController.getTre)
router.get("/getTre1", postsController.getTre1)
router.get("/getTrimestre1", postsController.getTrimestre1)
router.get("/getTrimestre2", postsController.getTrimestre2)
router.get("/getTrimestre3", postsController.getTrimestre3)
router.get("/getTrimestre4", postsController.getTrimestre4)
router.get("/getTables", postsController.getTables)
router.get("/getTu", postsController.getAvgTu)
router.get("/getTa", postsController.getAvgTa)



router.get("/:Poste", postsController.getById)

//router.put("/:id", postsController.update)
router.delete("/:id", postsController.delete)


module.exports = router