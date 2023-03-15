const { Router } = require('express');

// Importar todos los routers;

const dog = require('./dog');
const temperament = require('./temperament');

const router = Router();

// Configurar los routers

router.use('/dogs', dog)
router.use('/temperaments', temperament)

module.exports = router;
