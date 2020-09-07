const express = require('express');

const router = express.Router();

const reportsAPI = require('../../../controllers/api/v1/reports_api');

router.get('/:status', reportsAPI.status);

module.exports = router;