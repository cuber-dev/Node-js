const { readFileSync , writeFileSync } = require("fs")

const firstFile = readFileSync("./content/first.txt",'utf-8')
const secondFile = readFileSync("./content/second.txt",'utf-8')

console.log(firstFile)
console.log(secondFile) 


// Writing Files

writeFileSync(
    './content/result-sync.txt',
    `
    Results : ${firstFile} ,
            ${secondFile}.
    written`,{
        flag : 'a' // File mode
    }
)