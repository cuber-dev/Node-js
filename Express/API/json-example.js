
const express = require('express')
const app = express()
const port = 3000

const data = require('./public/data')

// normal response
app.get('/',(req,res) => {
    res.send(
        `
        <h1>Home</h1>
        <a href="/api/products">Products</a>
        `
    )
})

// JSON response
app.get('/api/products',(req,res) => {
    res.json(
        data
    )
})

// param example
app.get('/api/products/:PID',(req,res) => {
    // extracting params
    const id = Number(req.params.PID)
    const singleProduct = data.products.find(product => product.id === id)
    
    if(!singleProduct){
        return res.status(404).send('Product not found')
    }
    return res.json(
        singleProduct
    )
})
app.listen(port, () => {
    console.log('Server listening on port 3000...')
})