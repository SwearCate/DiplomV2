const Router = require('express')
const router = new Router()
const marksController = require('../controllers/marksController')

router.post('/', marksController.create)
router.get('/', marksController.getAll)

module.exports = router