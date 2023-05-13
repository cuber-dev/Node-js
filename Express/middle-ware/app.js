const cors = require('cors')
const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const port = 4000

const data = require('../public/data')

// cors
app.use(cors())

// request details
app.use(morgan('dev'))

// static assets 
app.use(express.static('../public/post-method'))

// parse form data 
app.use(express.urlencoded({ extended : false })) 

// parse form json data 
app.use(express.json())




// functions for doing similar tasks 
function writeLoginData(name){
    fs.writeFileSync('./peoples.txt',
            `>> ${name} ,${new Date().getHours()}:${new Date().getMinutes()}, ${new Intl.DateTimeFormat({ format : 'short' }).format(new Date())} \n`,
            { flag : 'a'}
        )
}






app.get('/api/products',(req,res) => {
    res.json({
        success : true,
        products : data.products
    }) 
})

app.get('/api/customers',(req,res) => {
    res.json({ 
        succes : true,
        customers : data.customers
    }) 
})
app.get('/api/products/search',(req,res) => {
    const { name , limit} = req.query
    let sortedProducts = data.products

    if(name){
        sortedProducts = sortedProducts.filter(product => {
            if(product.name.toLowerCase().startsWith(name.toLowerCase())){
                return product
            }
        })

        if(sortedProducts.length !== 0) {
            console.log(sortedProducts)
            return res.json(sortedProducts)
        }
        return res.status(404).send('Product not found')
    }

    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
        return res.json(sortedProducts)
    } 
    return res.json({
        success : true,
        products : data.products
    })
})

app.get('/api/products/:PID',(req,res) => {
    // extracting params
    const id = Number(req.params.PID)
    const singleProduct = data.products.find(product => product.id === id)
    
    if(!singleProduct){
        return res.status(404).send('Product not found')
    }
    return res.json(
        singleProduct
    )
})




// for browser post  method
app.post('/login',(req,res) => {
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
  


// for js post method
app.post('/api/people',(req,res) => {
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
})

// post method for adding people 
app.post('/api/people/add/cred',(req,res) => {
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
})

 // put method for updating people 
 app.put('/api/people/update/search',(req,res) => {
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
    
 }) 

app.delete('/api/people/delete/search',(req,res) => {
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
})

app.get('*',(req,res) => {
    res.send("Page not found")
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})      