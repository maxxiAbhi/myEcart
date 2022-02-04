require('../db/connection')
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express();
const User = require('../models/userSchema')
const {signup,signin}=require('../controller/userAuth')


router.post('/user/register', signup);

router.post('/user/login', signin)



module.exports = router;