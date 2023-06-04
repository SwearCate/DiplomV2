const {Marks} = require('../models/models')
const ApiError = require('../error/ApiError');

class TestController {
    async create(req, res) {
        const {cords} = req.body
        const test = await Marks.create({cords})
        return res.json(test)
    }

    async getAll(req, res) {
        const types = await Marks.findAll()
        return res.json(types)
    }

}

module.exports = new TestController()