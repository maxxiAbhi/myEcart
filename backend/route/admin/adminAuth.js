require('../../db/connection')
const express = require('express');
const router = express();
const {userAuth}=require('../../middleware/middleware')
const {signin,signout}=require('../../controller/admin/adminAuth')

// router.post('/admin/register', signup);

router.post('/admin/login', signin)

router.post('/admin/signout',userAuth,signout)

module.exports = router;