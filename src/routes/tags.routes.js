const { Router } = require("express");
const tagsRoutes = Router()

const TagController = require("../controller/TagsControlle")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const tagController = new TagController();

tagsRoutes.get("/",ensureAuthenticated, tagController.index)


module.exports = tagsRoutes