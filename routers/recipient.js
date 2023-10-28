const pool = require('../model/pg.js')

const router = require("express").Router()
router.post("/add_recipient", async (req, res, next) => {
    try {
        const { receiptissuer, storekeeper, chiefaccountant, } = req.body
        const add = await pool.query(`insert into recipient (receiptissuer,storekeeper,chiefaccountant) values($1,$2,$3)`,
            [receiptissuer, storekeeper, chiefaccountant])
        return res.json(add.rows)
    } catch (error) {
        next(error)
    }
})
router.get("/get_recipient", async (req, res, next) => {
    try {
        let recipients = await pool.query(`SELECT * FROM recipient`)
        return res.json(recipients.rows)
    }
    catch (error) { next(error) }
})

module.exports = router