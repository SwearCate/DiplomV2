const Router = require("express")
const router = new Router()
const employeesController = require('../controllers/employeesController')

router.post('/', employeesController.create)
router.get('/', employeesController.getAll)
router.get('/:id', employeesController.getOne)


module.exports = router