const express = require('express')
const router = express.Router()
const fs = require('fs')



// functions for doing similar tasks 
function writeLoginData(name){
    fs.writeFileSync('./peoples.txt',
            `>> ${name} ,${new Date().getHours()}:${new Date().getMinutes()}, ${new Intl.DateTimeFormat({ format : 'short' }).format(new Date())} \n`,
            { flag : 'a'}
        )
}

// for browser post  method
router.post('/',(req,res) => {
    // express.urlencoded allows us to use req.body , which contains form or other data
    // console.log(req.body)
    const { name } = req.body 
    console.log("Recived post request : ",name)
    if(name) {  
        writeLoginData(name)
        return res.status(200).json({ 
            success : true, 
            name
        })
    }
    return res.status(401).json({
        success : true,
        message : 'please provide a name'
    })
}) 


module.exports = router