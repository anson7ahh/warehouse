const pool = require('../model/pg.js')

const router = require("express").Router()

router.post("/add_receipt", async (req, res, next) => {
    try {
        const { recipientid, supplierid, warehouseid } = req.body
        const receipt = await pool.query(`insert into receipt (recipientid,supplierid,warehouseid) values($1,$2,$3) `,
            [recipientid, supplierid, warehouseid])
        return res.json(receipt.rows)
    }
    catch (err) {
        next(err)
    }
})
router.get("/getreceipt", async (req, res, next) => {
    try {
        const getreceipt = await pool.query(`select sum(price *quantity) as totalprice,sum(price) as price,sum(quantity) as quantity,product_name from product join receipt on product.receiptid = receipt.receiptid 
        group by product_name`)
        console.log(getreceipt.rows)
        return res.json(getreceipt.rows)
    } catch (error) {
        next(error)
    }
})
module.exports = router