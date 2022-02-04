const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        var token = jwt.sign({ _id: this._id },  process.env.JWT_SERECT_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('users', userSchema);

module.exports = User;