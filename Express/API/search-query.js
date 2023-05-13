
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

// search-query example 
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


app.get('*',(req,res) => {
    res.send("Page not found")
})
app.listen(port, () => {
    console.log('Server listening on port 3000...')
})