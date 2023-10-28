const pool = require('../model/pg.js')

const router = require("express").Router()

router.post("/add", async (req, res, next) => {
    try {
        const product_name = req.body.product_name;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const QuantityAsPerTheDocumen = req.body.QuantityAsPerTheDocumen;
        const unit = req.body.unit;
        const receiptid = req.body.receiptid


        let check = await pool.query(`select * from product where product_name = $1`, [product_name])
        if (check.rows.length !== 0) {
            const addproduct = await pool.query(`update product set quantity = quantity+ $1`,
                [quantity])

            return res.json(addproduct.rows);
        } else {
            const newproduct = await pool.query(`insert into product (product_name,quantity,price,QuantityAsPerTheDocumen,unit,receiptid)
        values ($1,$2,$3,$4,$5,$6)`, [product_name, quantity, price, QuantityAsPerTheDocumen, unit, receiptid])
            return res.json({
                message: `success`,
                newproduct: newproduct.rows

            })
        }

    } catch (error) {
        next(error)
    }


})
// xem san pham
router.get('/AllProduct', async (req, res) => {
    try {
        const getAllproduct = await pool.query(`select * from product order by quantity desc`)
        return res.json(getAllproduct.rows)
    } catch (error) {
        next(error)
    }
})

module.exports = router
