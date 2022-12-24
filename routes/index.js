const express = require('express');
const router = express.Router();

//import the user controller
const userController = require('../controller/user');

//import the quotation controller
const quotationController = require('../controller/quotation');

//mention the api
router.post('/sign-up', userController.createUser);

router.post('/sign-in', userController.signIn);

router.get('/user-details/:userId', userController.userDetails);

router.post('/create-quotation', quotationController.createQuotation);

router.get('/quotations', quotationController.getAllQuotations);

//export the router
module.exports = router;