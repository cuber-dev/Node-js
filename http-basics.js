
// // Server 

// const http = require('http');

// // const server = http.createServer((req, res) => {
// //     console.log("request was made: " + req.url)
    
// //     res.write("Welcome to my server")
// //     res.end()
// // })

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.end("Welcome to my home page")
//     }
//     if(req.url === '/about'){
//         res.end("Welcome to my about page")
//     }

//     res.end("404")
// })

// server.listen(8008)




const http = require('http')

const server = http.createServer((req, res) => {
    console.log("Request recived")
    res.end("Hello World")
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000")
})
