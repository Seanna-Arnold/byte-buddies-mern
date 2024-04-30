const express = require('express');
const router = express.Router();
const petsCtrl = require('../../controllers/api/pets');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
// router.post('/', petsCtrl.create);
router.get('/:id', petsCtrl.show);
router.get('/', petsCtrl.index);

// POST /api/users/login


module.exports = router;