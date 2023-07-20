"use strict";

import mongoose from 'mongoose';

const { Schema } = mongoose;

const couponSchema = new Schema(
{
    nome: { type: String, required: true, unique: true, index: true } ,

    desconto: { type: Number, required: true },

    quantidade: { type: Number, required: true, default: 0 }
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
