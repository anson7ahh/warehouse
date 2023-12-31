const { Pool } = require("pg")
require('dotenv').config()
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})
pool.connect().then(() => console.log('Connected!'))


module.exports = pool