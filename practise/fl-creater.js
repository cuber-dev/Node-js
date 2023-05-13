
// File creater with node (async)


const { readFile , writeFile } = require('fs').promises

const file = {
    name : "big.txt",
    content : "This is just a normal content"
}
console.log("File creation started")

for( let x = 0 ; x < 1000 ; x++){

    writeFile(
        `../content/${file.name}`,
        file.content,
        { flag : 'a' })
        .then(data => data)
        .catch(e => e)
}
