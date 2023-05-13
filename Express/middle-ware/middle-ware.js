
const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000


const logger = require('./logger')
const authorize = require('./authorize')

// req , middleware , res
// middleware - its a method passed between req and res 
//              for handling the request and response
//              it can be used for authentication, logging, 
//              data validation, etc.

// app.use(path,middleware) - allows us to use middleware on every route
//                            or on provided root



// we can use - our own / express / third party

// app.use([logger,authorize])
// app.use(express.static('./public'))
app.use(morgan('tiny'))


app.get('/',(req,res) => {
    res.send("Home page")
})

app.get('/about',(req,res) => {
    res.send("About page")
})
app.get('/api/products',(req,res) => {
    res.send("Products page")
})
app.get('/api/users',(req,res) => {
    if(req.user){
        res.send("Users page and Authorized")
    }else{
        res.send("Users page But Unauthorized")
    }
})


app.get('*',(req,res) => {
    res.send("Page not found")
})
app.listen(port, () => {
    console.log('Server listening on port 3000...')
})  