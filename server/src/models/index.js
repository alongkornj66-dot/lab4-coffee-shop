const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,    config.db.options
)

// โหลดไฟล์ Model ทั้งหมดในโฟลเดอร์นี้อัตโนมัติ
fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach((file) => {
        // วิธีเรียกใช้ Model แบบใหม่ (Modern Sequelize)
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.sync({ alter: true })

module.exports = db
