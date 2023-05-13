
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const fileStream = fs.createReadStream('../content/big.txt', 'utf8')
    fileStream.on('open', () => {
        fileStream.pipe(res)
    })
    fileStream.on('error', (e) => {
        res.end(e)
    })

    // const data = fs.readFileSync('../content/big.txt', 'utf8')
    // res.end(data)
})

server.listen(5000, () => {
    console.log('Server listening on port 5000')
})