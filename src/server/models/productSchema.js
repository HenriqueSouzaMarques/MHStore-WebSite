"use strict";

import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
{
    nome: { type: String, required: true },

    tipo: { type: String, enum: ['t-shirt', 'shorts', 'pants', 'sneakers'], required: true },

    marca: { type: String, enum: ['Adidas', 'Nike', 'Vans', 'High'], required: true },

    imagem: { type: String, required: true },

    estoque: { type: Number, required: true },

    preco: { type: Number, required: true },

    id: { type: Number, required: true, unique: true, index: true }  
});

const Produto = mongoose.model('Produto', productSchema);

export default Produto;
