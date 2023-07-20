"use strict";

import Produto from '../models/productSchema.js';

const productController = {};

productController.getAll = async (req, res) =>
{
    try
    {
        const produtos = await Produto.find();
        res.json(produtos);
    } 
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

productController.getById = async (req, res) =>
{
    const idReq = req.params.id;

    try
    {
        const produto = await Produto.findById(idReq);
        res.json(produto);
    } 
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

productController.create = async (req, res) =>
{
    try
    {
        const product = new Produto(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

productController.update = async (req, res) =>
{
    const product = req.body;

    const idReq = product._id;

    try
    {
        const updatedProduct = await Produto.findByIdAndUpdate(idReq,
        {
            $set:
            {
                nome: product.nome,
                tipo: product.tipo,
                marca: product.marca,
                imagem: product.imagem,
                estoque: product.estoque,
                preco: product.preco,
                id: product.id
            }   
        }, { new: true });

        res.status(201).json(updatedProduct);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

productController.delete = async (req, res) =>
{
    const idReq = req.params.id;

    try
    {
        await Produto.findOneAndDelete( { id: idReq } )

        res.status(201).send(
        {
            message: 'Successful delete!'    
        });
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

export default productController;