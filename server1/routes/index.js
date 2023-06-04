const Router = require("express")
const router = new Router()
const userRouter = require('./userRouter')
const employeesRouter = require('./employeesRouter')
const testRouter = require('./testRouter')
const marksRouter = require('./marksRouter')

router.use('/user', userRouter)
router.use('/employees', employeesRouter)
router.use('/test', testRouter)
router.use('/marks', marksRouter)

module.exports = router