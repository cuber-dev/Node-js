const cors = require('cors')
const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 4000

// routers
const peopleRouter = require('./people')
const authRouter = require('./auth')
const productsRouter = require('./products')

const data = require('../public/data')

// cors
app.use(cors({ origin : "*"})) 

// request details
app.use(morgan('dev'))

// static assets 
app.use(express.static('../public/post-method'))

// parse form data 
app.use(express.urlencoded({ extended : false })) 

// parse form json data 
app.use(express.json())


// router setup
app.use('/api/people',peopleRouter)
app.use('/api/products',productsRouter)
app.use('/login',authRouter)

 
 

app.get('/api/customers',(req,res) => {
    res.json({ 
        succes : true,
        customers : data.customers
    }) 
})




app.get('*',(req,res) => {
    res.send("Page not found")
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})      
