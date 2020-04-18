const express = require('express');
const router = express.Router();

/** @const {module} the main controller for the game route */
const GameController = require('../controllers/GameController');

// An endpoint that serves the game view.
router.get('/', GameController.serveFile);

module.exports = router;