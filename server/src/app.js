const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models') // เรียกใช้ sequelize object ที่เราสร้างไว้
const config = require('./config/config')

const app = express()

// --- Middleware Section ---
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// --- Routes Section ---
require('./routes')(app)

// --- Server Startup Section ---
const port = config.port

// สั่ง Sync ฐานข้อมูลก่อน แล้วค่อยเริ่ม Server
// force: false หมายถึง ถ้ามีตารางอยู่แล้ว ไม่ต้องลบสร้างใหม่ (รักษาข้อมูลเดิมไว้)
sequelize.sync({ force: false }).then(() => {
    app.listen(config.port, function () {
        console.log('CoffeeShop Server running on port ' + config.port)
        })
    })

