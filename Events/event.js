const EventEmmiter = require('events')


const customEmmiter = new EventEmmiter()

let isLoggedIn = true

// on - listen for an event
// emit - emit event || invoke the event


 
// name of the event and callBack function
customEmmiter.on('loggedin',(data) => {
    console.log('data received : ' ,data)
})
// name of the event and callBack function
customEmmiter.on('loggedout',(data) => {
    console.log('data received : ' ,data)
})
 
if(isLoggedIn){
    // name of the event and params
    customEmmiter.emit('loggedin',{
        userName : "ANU",
        id : 1891347128,
        status : "Logged-in" 
    })
}else{
    // name of the event and params
    customEmmiter.emit('loggedout',{
       userName : "ANU", 
        id : 1891347128,
        status : "Logged-out" 
    })
}


