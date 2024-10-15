const express = require('express');
import UsersController from '../controllers/UsersController';
const router = express.Router();

const {
  getStatus,
  getStats,
} = require('../controllers/AppController');

/*const {
  postNew,
  getMe,
} = require('../controllers/UsersController');*/

const {
  getConnect,
  getDisconnect,
} = require('../controllers/AuthController');

router.get('/status', getStatus);

router.get('/stats', getStats);

router.post('/users', (req, res) => {
  UsersController.postNew(req, res);
});

router.get('/users/me', (req, res) => {
  UsersController.getMe(req, res);
});

router.get('/connect', getConnect);

router.get('/disconnect', getDisconnect);

module.exports = router;
