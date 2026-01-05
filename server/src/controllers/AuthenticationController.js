const { User } = require('../models')

module.exports = {
    // ฟังก์ชันสำหรับสมัครสมาชิก
 async register (req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'อีเมลนี้มีผู้ใช้งานแล้วในระบบ'
            })
        }
    }
}
