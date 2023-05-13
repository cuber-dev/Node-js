
const express = require('express');
const router = express.Router();

const controller = require('../controllers/peoples-c')


// root
router.get('/',controller.sendPeoples)

// for js post method
router.post('/write',controller.writePerson)

// post method for adding people 
router.post('/add/cred',controller.addPeoples)

// put method for updating people 
router.put('/update/search',controller.updatePeoples) 

// delete method for deleting people
router.delete('/delete/search',controller.deletePeoples)


module.exports = router;