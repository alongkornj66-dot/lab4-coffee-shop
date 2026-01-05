// src/routes.js
const CoffeeController = require('./controllers/CoffeeController')

module.exports = (app) => {
    // เส้นทางสำหรับจัดการเมนูกาแฟ (Coffee Routes)
    app.get('/coffees', CoffeeController.index)      // ดูเมนูทั้งหมด
    app.post('/coffee', CoffeeController.create)     // เพิ่มเมนู
    app.put('/coffee/:coffeeId', CoffeeController.put) // แก้ไขเมนู
    app.delete('/coffee/:coffeeId', CoffeeController.remove) // ลบเมนู
    app.get('/coffee/:coffeeId', CoffeeController.show) // ดูเมนูรายตัว
}   