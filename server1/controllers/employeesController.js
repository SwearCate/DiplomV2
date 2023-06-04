const {Employees} = require('../models/models')
const ApiError = require('../error/ApiError')


class EmployeesController{
    async create(req, res, next){
        try {
            let {name, mobile, location,} = req.body
            const employees = await Employees.create({name, mobile, location });
            return res.json(employees)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){

    }
    async getOne(req, res){

    }

}
module.exports = new EmployeesController()