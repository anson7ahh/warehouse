const pool = require('../model/pg.js')

const router = require("express").Router()
router.post("/add_supplier", async (req, res, next) => {
    try {
        const { deliveryperson, company } = req.body
        const supplier = await pool.query(`insert into supplier (deliveryperson,company) values($1,$2)
        `, [deliveryperson, company])
        return res.json(supplier.rows)
    } catch (error) {
        next(error)
    }
})
router.get("/supplier", async (req, res, next) => {
    try {

        const getsupplier = await pool.query(`select * from supplier `)

        return res.json(getsupplier.rows)
    } catch (error) {
        next(error)
    }
})
module.exports = router