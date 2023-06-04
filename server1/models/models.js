const sequelize = require('../db')
const  {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Employees = sequelize.define('employees', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    mobile: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING,},
})
const Marks = sequelize.define('marks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cords: {type: DataTypes.INTEGER}
})

const Test = sequelize.define('test',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: true},
})


User.hasMany(Employees)
User.hasMany(Marks)
Employees.belongsTo(User)
Marks.belongsTo(User)

module.exports = {
    User,
    Employees,
    Marks,
    Test
}