var jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

exports.userAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const verfyToken = jwt.verify(token, process.env.JWT_SERECT_KEY);
            const rootUser = await User.findOne({ _id: verfyToken._id })
            if (!rootUser) {
                throw new Error('user not found')
            }
            req.rootUser = rootUser
            req.userId = rootUser._id
        } else {
            res.status(401).json({ message: 'Login First' })
        }
        next()
    } catch (error) {
        res.status(401).json({ message: 'unauthorised token' })
    }

}

exports.adminMiddleware = (req, res, next) => {
    if (req.rootUser.role != 'admin') {
        return res.status(401).json({ message: 'Acess Denied' })
    }
    next()
}



exports.userMiddleware = (req, res, next) => {
    // console.log(req.rootUser)
    if (req.rootUser.role != 'user') {
        return res.status(401).send('Acess Denied')
    }
    next()
}