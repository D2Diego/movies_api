const { Router } = require("express");
const notesRoutes = Router()

const NotesController = require("../controller/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.get("/", notesController.index)

module.exports = notesRoutes