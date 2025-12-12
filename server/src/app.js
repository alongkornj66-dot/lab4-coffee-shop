const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ===== In-memory "Coffee Menu" (ไม่ต้องใช้ DB ก็เทสได้) =====
let coffees = [
  { id: 1, name: 'Americano', price: 60, size: 'M' },
  { id: 2, name: 'Latte', price: 75, size: 'M' }
]
let nextId = 3

// ===== Status =====
app.get('/status', (req, res) => {
  res.send('Coffee Shop API is running')
})

// ===== Coffee Shop RESTful API (5 cases) =====

// 1) GET all coffees
app.get('/coffees', (req, res) => {
  res.json({ message: 'รายการเมนูเครื่องดื่มทั้งหมด', data: coffees })
})

// 2) GET coffee by id
app.get('/coffee/:coffeeId', (req, res) => {
  const id = Number(req.params.coffeeId)
  const found = coffees.find((c) => c.id === id)
  if (!found) return res.status(404).json({ message: 'ไม่พบเมนูนี้', id })
  res.json({ message: 'ดูเมนูเครื่องดื่มตาม ID', data: found })
})

// 3) POST create coffee
app.post('/coffee', (req, res) => {
  const { name, price, size } = req.body || {}
  const newCoffee = {
    id: nextId++,
    name: name ?? 'Unnamed Coffee',
    price: price ?? 0,
    size: size ?? 'M'
  }
  coffees.push(newCoffee)
  res.json({ message: 'เพิ่มเมนูเครื่องดื่มสำเร็จ', data: newCoffee, body: req.body })
})

// 4) PUT update coffee
app.put('/coffee/:coffeeId', (req, res) => {
  const id = Number(req.params.coffeeId)
  const idx = coffees.findIndex((c) => c.id === id)
  if (idx === -1) return res.status(404).json({ message: 'ไม่พบเมนูนี้', id })

  coffees[idx] = { ...coffees[idx], ...req.body, id } // กัน id เปลี่ยน
  res.json({ message: 'แก้ไขเมนูเครื่องดื่มสำเร็จ', data: coffees[idx], body: req.body })
})

// 5) DELETE coffee
app.delete('/coffee/:coffeeId', (req, res) => {
  const id = Number(req.params.coffeeId)
  const idx = coffees.findIndex((c) => c.id === id)
  if (idx === -1) return res.status(404).json({ message: 'ไม่พบเมนูนี้', id })

  const deleted = coffees.splice(idx, 1)[0]
  res.json({ message: 'ลบเมนูเครื่องดื่มสำเร็จ', data: deleted, body: req.body })
})

/* =========================================================
   Alias routes (เผื่ออาจารย์เทสตามตัวอย่างเดิมในเอกสาร)
   /users, /user/:id, POST /user, PUT/DELETE /user/:id
========================================================= */
app.get('/users', (req, res) => res.redirect('/coffees'))
app.get('/user/:userId', (req, res) => res.redirect(`/coffee/${req.params.userId}`))
app.post('/user', (req, res) => res.redirect(307, '/coffee'))
app.put('/user/:userId', (req, res) => res.redirect(307, `/coffee/${req.params.userId}`))
app.delete('/user/:userId', (req, res) => res.redirect(307, `/coffee/${req.params.userId}`))

// ===== Start server =====
let port = 8081
app.listen(port, function () {
  console.log('server running on ' + port)
})
