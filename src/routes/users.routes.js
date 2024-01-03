const { Router, response } = require("express");
const multer = require("multer")
const uploading = require("../configs/upload")


const usersRoutes = Router()
const upload = multer(uploading.MULTER)

const UsersController = require("../controller/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersController = new UsersController();

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar",ensureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename)
    response.json()
})

module.exports = usersRoutes