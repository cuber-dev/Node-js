
 const http = require('http')
 const { readFileSync } = require('fs')

const homePage = readFileSync('./index.html')
 


 const server = http.createServer((req,res)=>{
    const url = req.url
    if(url === '/' || url === '/home' || url === '/index'){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(homePage) 
        res.end()
    }else if(url === '/about'){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }else{
        res.writeHead(404,{'Content-Type':'text/html'})
        res.write('<h1>Page Not Found</h1>')
        res.end()
    }
    
})

 server.listen(3000,()=>{
    console.log('Server is running on port 3000')
 })
 