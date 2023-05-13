
const path = require('path')
const express = require('express')
const app = express()
const port = 3000

// app methods
/*
    app.get()
    app.post()
    app.put()
    app.delete()
    app.all()
    app.use()
    app.listen()
*/

// For getting static assets for all routes
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     console.log('Hello world received a request.')
//     res.sendFile(path.resolve(__dirname, './public/index.html'))
// })
 
app.get('/about', (req, res) => {
    console.log('Hello world received a request.')
     // for sending a file
    res.sendFile(path.resolve(__dirname, './public/about.html'))
})

app.all('*',(req,res) => { 
    res.status(404).sendFile(path.resolve(__dirname, './public/not-found.html'))
})


app.listen(port, () => {
    console.log('Server listening on port 3000')
})
