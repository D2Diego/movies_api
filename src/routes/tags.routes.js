const { Router } = require("express");
const tagsRoutes = Router()

const TagController = require("../controller/TagsControlle")
const tagController = new TagController();

tagsRoutes.get("/:user_id", tagController.index)


module.exports = tagsRoutes