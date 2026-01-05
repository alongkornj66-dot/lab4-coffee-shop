// src/config/config.js
module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'coffeeshop-db',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        options: {
            dialect: 'sqlite',
            storage: './coffeeshop-db.sqlite',
            logging: false
        }
    }
}

