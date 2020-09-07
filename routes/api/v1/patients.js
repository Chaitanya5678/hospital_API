const express = require('express');

const passport = require('passport');

const router = express.Router();

const patientsAPI = require('../../../controllers/api/v1/patients_api');

router.get('/register', passport.authenticate('jwt', {session: false}), patientsAPI.register);
router.get('/:id/create_report', passport.authenticate('jwt', {session: false}), patientsAPI.createReport);
router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), patientsAPI.allReports);

module.exports = router;