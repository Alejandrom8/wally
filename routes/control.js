const express = require('express');
const router = express.Router();

/** @const {module} the main controller for the control route */
const RemoteControl = require('../controllers/RemoteControl.js');

//the endpoint that will give the control.html file
router.get('/', RemoteControl.serveFile);

module.exports = router;