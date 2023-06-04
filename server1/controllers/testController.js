const {Test} = require('../models/models')
const ApiError = require('../error/ApiError');

class TestController {
    async create(req, res) {
        const {name} = req.body
        const test = await Test.create({name})
        return res.json(test)
    }

    async getAll(req, res) {
        const types = await Test.findAll()
        return res.json(types)
    }

}

module.exports = new TestController()