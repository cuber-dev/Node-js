// controller for peoples

const data = require('../public/data')
const fs = require('fs')


const sendPeoples = (req,res) => {
        res.json({ 
            succes : true,
            people : data.people
        }) 
}

// functions for doing similar tasks 
function writeLoginData(name){
    fs.writeFileSync('./peoples.txt',
            `>> ${name} ,${new Date().getHours()}:${new Date().getMinutes()}, ${new Intl.DateTimeFormat({ format : 'short' }).format(new Date())} \n`,
            { flag : 'a'}
        )
}

const writePerson = (req,res) => {
    const { name } = req.body
    
    console.log("Recived post request : ",name)
    if(name){
        writeLoginData(name)
        return res.status(200).json({ 
            success : true,
            name
        })
    } 
   
    return res.status(200).json({
        success : true,
        message : "Please Provide a Name"
    })  
}

const addPeoples = (req,res) => {
    const { name , email } = req.query
    if( name && email ){
        const newPerson = {
            id : data.people.length + 1,
            name,
            email
        }
        const isSimlarPeople = data.people.filter(person => {
            return person.name === newPerson.name && person.email === newPerson.email 
        })
        if(isSimlarPeople.length === 0){
            data.people.push(newPerson)
            fs.writeFile(
                '../public/data.js',
                `module.exports = ${JSON.stringify({
                    products : data.products,
                    customers : data.customers,
                    people : data.people
                })}`,
                (error,data) => {
                    if(error){
                        return res.status(500).json(
                            {
                                success : true,
                                message : `Interna;l server error ,
                                        Failed to add person : ${name}`
                            }
                        )
                    } 

                    const response = {
                        success : true,
                        newPerson : newPerson,
                        message : "Added Succesfully"
                    }
                    return res.json(response)
                }
            )
        }else{
            return res.json(
                {
                    success : true,
                    message : "Person already exists,Not modified"
                }
            )
        }
        
    }else{
        return res.status(401).json(
            {
                success : true,
                message : "Please provide Name and Email address!"
            }
        )
    }
}

const updatePeoples = (req,res) => {
    const  id = Number(req.query.id)
    const { name } = req.body
    console.log("Recived put request for : ",id ,name)
    if(!name){
        return res.status(401).json({
            success : true, 
            message : "Please Provide a Name"
        }) 
    } 

    let person = data.people.find(p => p.id === id)
    if(name && id && person){
        const prevName = person.name
        person.name = name
        const updatedPeople = data.people.map(p => p.id === id ? person : p)
        fs.writeFile('../public/data.js',`
            module.exports = ${JSON.stringify({
                products : data.products,
                customers : data.customers,
                people : updatedPeople
            })}
        `,(error,data) => { 
            if(error){
                return res.status(500).json({
                    success : true,
                    message : "Internal Server Error : failed to update"
                })
            }
            const response = {
                success : true,
                message : "Updated Successfully",
                prevName : prevName,
                updatedName : name,
                personId : id
            } 
            console.log(response)
            return res.json(
                response
            )
        })
        
    }else{
        return res.status(404).json({
            success : true,
            message : "not found , Please provide valid credintials"
        }) 
    } 
    
 }

const deletePeoples = (req,res) => {
    const  id = Number(req.query.id)
    console.log("Recived delete request for : ",id)
   
    const deleteablePerson = data.people.find(p => p.id === id)
    if(deleteablePerson){
        let updatedPeople = data.people.filter(p => p.id !== id)
        updatedPeople = updatedPeople.map((p,i) => {
            return {
                id : i + 1,
                name : p.name,
                email : p.email
            }
        }) 
        fs.writeFile('../public/data.js',
            `
                module.exports = ${JSON.stringify({
                    products : data.products,
                    customers : data.customers,
                    people : updatedPeople
                })}
            `,
            (error,data) => {
                if(error){
                    return res.status(500).json({
                        success : true,
                        message : "Internal server error ,Failed to delete"
                    })
                }

                const response = {
                    success : true,
                    deletedPerson : deleteablePerson,
                    message : "Deleted Successfully"
                }
                res.json(response)
            }
        )
    }else{
        res.status(404).json({
            success : true,
            message : "not found , Please provide valid credintials"
        })
    }
}

module.exports = {
    sendPeoples,
    writePerson,
    addPeoples,
    updatePeoples,
    deletePeoples
}