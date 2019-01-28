const express = require('express');
const router = express.Router();

const userController = require('./controller/user.controller');
const file_pathController = require('./controller/file_path.controller');

const jwtHelper = require('./config/jwtHelper');

router.post('/user', userController.userPost);
router.get('/user', userController.userGet);
router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);

router.post('/documents', file_pathController.docPost);

router.post('/auth', userController.authenticate);

module.exports = router;