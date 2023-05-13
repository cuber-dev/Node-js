

const express = require('express');
const router = express.Router();

const data = require('../public/data')


router.get('/',(req,res) => {
    res.json({
        success : true,
        products : data.products
    }) 
})


router.get('/search',(req,res) => {
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
            return res.json({
                success : true,
                sortedProducts
            })
        }
        return res.status(404).send('Product not found')
    }

    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
        return res.json({
            success : true,
            sortedProducts
        })
    } 
    return res.json({
        success : true,
        products : data.products
    })
})

router.get('/:PID',(req,res) => {
    // extracting params
    const id = Number(req.params.PID)
    const singleProduct = data.products.find(product => product.id === id)
    
    if(!singleProduct){
        return res.status(404).send('Product not found')
    }
    return res.json(
        {
            success : true,
            singleProduct
        }        
    )
})



module.exports = router