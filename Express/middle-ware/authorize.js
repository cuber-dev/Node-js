

const authorize = (req,res,next) => {
    const { user } = req.query;
    if(user === 'john'){
        req.user = { name: 'john', id: 3}
        console.log('authorized')
        return next();
    }else{
        console.log('Unauthorized')
        return next()
    }
}


module.exports = authorize;