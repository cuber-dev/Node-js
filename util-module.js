const fsReadFile = require('fs').readFile
const util = require('util')
const readFilePromise = util.promisify(fsReadFile)
async function utilAsync(path){
    try {
        const data = await readFilePromise(path,'utf-8')
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

utilAsync('./content/first.txt')


const hi = () => {
    return "Hai"
}
const asyncHi = util.promisify(hi)
async function say(){
    const result = await hi()
    console.log((result))
}

say()