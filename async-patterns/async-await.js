
const fs = require('fs').promises

async function readFile(path){
    try{
        const data = await fs.readFile(path,'utf-8')
        console.log(data);
    }catch(error){
        console.log(error);
    }
}
readFile('../content/first.txt')


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

utilAsync('../content/first.txt')

