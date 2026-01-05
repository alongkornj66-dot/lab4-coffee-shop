module.exports = (sequelize, DataTypes) => {
    // กำหนดโครงสร้างตาราง User
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true // อีเมล์ต้องไม่ซ้ำ
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        status: DataTypes.STRING,
        type: DataTypes.STRING
    })
    return User
}

