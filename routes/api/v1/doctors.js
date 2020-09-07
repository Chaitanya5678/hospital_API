const express = require('express');

const router = express.Router();

const doctorsAPI = require('../../../controllers/api/v1/doctors_api');

router.get('/register', doctorsAPI.register);
router.get('/login', doctorsAPI.login);

module.exports = router;