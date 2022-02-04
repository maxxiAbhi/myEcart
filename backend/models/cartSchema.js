const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cartItem: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
                unique:true
            },
            quantity:{
                type: Number,
                default:1
            }
            ///price is increase after add to cart so price offf
            // ,
            // price:{
            //     type: Number,
            //     required: true
            // }

        }
    ]
}, {
    timestamps: true
});


const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart