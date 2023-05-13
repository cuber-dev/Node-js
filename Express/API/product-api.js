
const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const data = require('../public/data')

app.use(morgan('tiny'))

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
        data.products
    )
})
app.get('/api/customers',(req,res) => {
    res.json(
        data.customers
    )
})

// query example 
app.get('/api/products/search',(req,res) => {
    // extracting query's
    const { name , limit} = req.query
    let sortedProducts = data.products

    if(name){
        sortedProducts = sortedProducts.filter(product => {
            if(product.name.toLowerCase().startsWith(name.toLowerCase())){
                return product
            }
        })

        if(sortedProducts.length !== 0) {
            console.log(sortedProducts)
            return res.json(sortedProducts)
        }
        return res.status(404).send('Product not found')
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
        return res.json(sortedProducts)
    } 
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

app.get('*',(req,res) => {
    res.status(404).send("Page not found")
})
app.listen(port, () => {
    console.log('Server listening on port 3000...')
})