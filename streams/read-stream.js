// streams

const fs = require('fs')

// createReadStream - for reading large chunks of data
const stream = fs.createReadStream('../content/big.txt', { highWaterMark : 90000 , encoding : 'utf8'})


stream.on('data', (data) => {
    console.log(">> " , data.length)
})   

stream.on('error', (e) => {
    console.log(">> " , e)
})   