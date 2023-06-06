const express = require("express");
const router = express.Router();
const upload = require("../config/uploadConfig");

var userController = require("../controllers/userController");

router.get("/", function (req, res) {
    userController.listAll(req, res);
});

router.post("/login", function (req, res) {
    userController.validateLogin(req, res);
});

router.post("/register", function (req, res) {
    userController.validateRegister(req, res);
});

router.post("/forgot-password/", function (req, res) {
    userController.forgotPassword(req, res);
});

router.post("/password-reset/:token", function (req, res) {
    userController.resetPassword(req, res);
});

router.get("/:username", function (req, res) {
    userController.findUsername(req, res);
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/upload/avatar', upload.single('avatar'), (req, res) => {
    userController.saveAvatar(req, res);
});

router.post('/upload/banner', upload.single('banner'), (req, res) => {
    userController.saveBanner(req, res);
});

module.exports = router;