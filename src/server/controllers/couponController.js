"use strict";

import Coupon from '../models/couponSchema.js';


const couponController = {};

couponController.getAll = async (req, res) =>
{
    try {
        const cupons = await Coupon.find();
        res.json(cupons);
    } 
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

couponController.getByName = async (req, res) =>
{
    const name = req.params.name;

    try {
        const coupon = await Coupon.findOne( { nome: name } );
        res.json(coupon);
    } 
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

couponController.create = async (req, res) =>
{
    try
    {
        const cupom = new Coupon(req.body);
        await cupom.save();
        res.status(201).json(cupom);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

couponController.update = async (req, res) =>
{
    const cupom = req.body;

    const id = req.params.id

    try
    {
        const updatedProduct = await Coupon.findByIdAndUpdate(id,
        {
            $set:
            {
                nome: cupom.nome,
                quantidade: cupom.quantidade,
                desconto: cupom.desconto
            }   
        }, { new: true });

        res.status(201).json(updatedProduct);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

couponController.delete = async (req, res) =>
{
    const id = req.params.id;

    try
    {
        await Coupon.findByIdAndDelete(id);

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

export default couponController;