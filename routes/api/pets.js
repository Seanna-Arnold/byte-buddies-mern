const express = require('express');
const router = express.Router();
const petsCtrl = require('../../controllers/api/pets');


router.get('/:id', petsCtrl.show);
router.get('/', petsCtrl.index);
router.post('/', petsCtrl.create);
router.put('/:id', petsCtrl.update);
router.delete('/:id', petsCtrl.remove);


module.exports = router;