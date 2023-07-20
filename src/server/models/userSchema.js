"use strict";

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
{
    type: {type: String, enum: ['admin', 'cliente'], default: 'cliente'},

    id: { type: Number, required: true, unique: true, index: true },

    email: { type: String, required: true, unique: true },

    username: { type: String, required: true },

    password: { type: String, required: true},

    name: { type: String, required: true},

    gender: {type: String, enum: ['male', 'female', 'other'] },

    street: { type: String, required: true},

    number: { type: Number, required: true},

    zipCode: { type: String, required: true},

    fullAddress: {type: String, required: true},

    phone: { type: String, required: true},

    cartProducts:
    {
        type: 
        [ 
            { 
                id: { type: String, required: true }, 
                tamanho: {type: String, required: true}, 
                quantidade: { type: Number, required: true }
            } 
        ],
        _id: false,
        default: []
    },

    totalProducts: { type: Number, required: true, default: 0},

    purchaseAmount: { type: Number, required: true, default: 0},

    purchaseHistory: 
    { 
        type: 
        [
            { 
                produtos:
                [ 
                    { 
                        id: { type: String, required: true }, 
                        tamanho: {type: String, required: true}, 
                        quantidade: { type: Number, required: true },
                        _id: false
                    } 
                ],
                total: { type: Number, required: true},
                cartao: { type: String, required: true},
                
            }
        ],
        _id: false,
        default: [] 
    }
}
)

const User = mongoose.model('User', userSchema);

export default User;