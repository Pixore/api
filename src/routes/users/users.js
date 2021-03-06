const router = require('express').Router()
const controller = require('./users.ctrl.js')
const querymen = require('querymen')

const { querySchema } = require('../../models/user')

router.get('/', controller.getAll)
router.get('/search', querymen.middleware(querySchema), controller.getSearch)
router.get('/:id', controller.getOne)

router.put('/:id', controller.put)

module.exports = router
