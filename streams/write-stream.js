
const fs = require('fs');

const readStream = fs.createReadStream('newBig2.txt', { encoding: 'utf8' });

const writeStream = fs.createWriteStream('newBig3.txt');

// pipe method example
readStream.on('open', () => {
    readStream.pipe(writeStream)
})

writeStream.write("HAi")
