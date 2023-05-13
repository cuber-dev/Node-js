
const path = require("path")

console.log(path.sep)

const filePath = path.join('/content','/files','test.txt')

console.log(filePath)

const base = path.basename(filePath)
console.log(base)


// Absolute path for every device
const absolutePath = path.resolve(__dirname,'content','files','test.txt')
console.log(absolutePath)