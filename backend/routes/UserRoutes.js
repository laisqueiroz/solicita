const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateJWT } = require("../middlewares/AuthMiddleware");
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', upload.single('agreement'), UserController.createUser);
router.post('/login', UserController.loginUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports= router;