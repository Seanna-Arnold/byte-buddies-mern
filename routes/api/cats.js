const express = require('express');
const router = express.Router();
const catsCtrl = require('../../controllers/api/cats');


router.get('/:id', catsCtrl.show);
router.get('/', catsCtrl.index);
router.post('/', catsCtrl.create);
router.put('/:id', catsCtrl.update);
router.delete('/:id', catsCtrl.remove);


module.exports = router;