const { Coffee } = require('../models')

module.exports = {

  // ดูรายการกาแฟทั้งหมด
  async index (req, res) {
    const coffees = await Coffee.findAll()
    res.send(coffees)
  },

  // เพิ่มเมนูกาแฟใหม่
  async create (req, res) {
    try {
      const coffee = await Coffee.create(req.body)
      res.send(coffee)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // แก้ไขข้อมูลกาแฟ
  async put (req, res) {
    try {
      await Coffee.update(req.body, {
        where: { id: req.params.coffeeId }
      })
      res.send({ message: 'Coffee updated' })
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // ลบเมนูกาแฟ
  async remove (req, res) {
    try {
      await Coffee.destroy({
        where: { id: req.params.coffeeId }
      })
      res.send({ message: 'Coffee deleted' })
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // ดูรายละเอียดกาแฟ
  async show (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      res.send(coffee)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
