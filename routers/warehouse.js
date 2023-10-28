const pool = require('../model/pg.js')

const router = require("express").Router()
router.get("/warehouse", async (req, res, next) => {
    try {
        const warehouse = await pool.query(`select product_name,sum(quantity) from warehouse as wh right join product as pr on wh.warehouseid = pr.warehouseid
        GROUP BY product_name order by product_name asc`)
        return res.json(warehouse.rows)
    } catch (err) {
        next(err)
    }
})
module.exports = router