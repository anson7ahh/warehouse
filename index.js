const express = require("express")
const app = express()
const port = 6000;
const pool = require("./model/pg.js")
require('dotenv').config()
const product = require("./routers/product.js")
const warehouse = require("./routers/warehouse.js")
const supplier = require("./routers/supplier.js")
const receipt = require("./routers/receipt.js")
const recipient = require("./routers/recipient.js")
const createError = require('http-errors')
app.use(express.json())

app.use("/", supplier)
app.use("/", recipient)
app.use("/", product)
app.use("/", warehouse)
app.use("/", receipt)
app.use((req, res, next) => {
    next(createError.NotFound('ko tim thay router'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})