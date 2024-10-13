const express = require('express');

const router = express.Router();

const {
  getStatus,
  getStats,
} = require('../controllers/AppController');

const {
  postNew,
  getMe,
} = require('../controllers/UsersController');

const {
  getConnect,
  getDisconnect,
} = require('../controllers/AuthController');

router.get('/status', getStatus);

router.get('/stats', getStats);

router.post('/users', postNew);

router.get('/users/me', getMe);

// router.get('/connect', getConnect);

// router.get('/disconnect', getDisconnect);

module.exports = router;
