"use strict";

import bcrypt from 'bcrypt';
import axios from 'axios';

import User from "../models/userSchema.js";

const userController = {};

userController.getAll = async (req, res) =>
{
    try {
        const users = await User.find();
        res.json(users);
    } 
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

userController.getById = async (req, res) =>
{
    const idReq = req.params.id;

    try {
        const user = await User.findById(idReq);
        res.json(user);
    } 
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

userController.auth = async (req, res) =>
{
    const action = req.header('X-Action'); // Retrieve the custom header
    const userPost = req.body
    
    if (action === 'createUser')
    {
        try
        {
            const existingUser = await User.findOne({ email: userPost.email });

            if (existingUser)
            {
                return res.status(409).json({ message: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(userPost.password, 10);

            const user = { ...userPost, password: hashedPassword };

            const newUser = new User(user);

            const savedUser = await newUser.save();

            return res.status(201).json(savedUser);
        }
        catch (error)
        {
            console.error(error);
            
            return res.status(500).json({ message: 'Server error create' });
        }
    }
    else if (action === 'verifyLogin')
    {
        try
        {
            const user = await User.findOne({ email: userPost.email });

            if (!user)
            {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(userPost.password, user.password);

            if (isPasswordValid)
            {
                return res.status(200).json(user);
            } 
            else 
            {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } 
        catch (error)
        {
            return res.status(500).json({ message: 'Server error login' });
        }
    } 
    else
    {
      return res.status(400).json({ message: 'Invalid action' });
    }
};

userController.addProductToCart = async (req, res) =>
{    
    const user = req.body;
    const { productId, size, qtd } = req.params;

    let quantity = user.totalProducts;
    let purchase = user.purchaseAmount;
    
    const existingProductIndex = (user.cartProducts).findIndex((produto) => (produto.id === productId) && (produto.tamanho === size));

    const response = await axios.get(`http://localhost:8000/products/${productId}`);
    const product = await response.data;

    let newCart = null;

    if (existingProductIndex !== -1)
    {
        const existingProduct = { ...user.cartProducts[existingProductIndex] };
      
        if (existingProduct.quantidade + parseInt(qtd) > (product.estoque))
        {
            quantity += (product.estoque - existingProduct.quantidade);
            purchase += (product.estoque - existingProduct.quantidade) * (product.preco);
            existingProduct.quantidade = product.estoque;
        }
        else
        {
            quantity += parseInt(qtd);
            purchase += (parseInt(qtd) * (product.preco));
            existingProduct.quantidade += parseInt(qtd);
        }

        newCart = [...user.cartProducts];
        newCart[existingProductIndex] = existingProduct;
    }
    else
    {
        
        quantity += parseInt(qtd);
        purchase += (parseInt(qtd) * product.preco);
        newCart = [...user.cartProducts, { id: productId, tamanho: size, quantidade: parseInt(qtd) }];
    }
      
    try
    {
        const idReq = user._id;

        const updatedUser = await User.findByIdAndUpdate(idReq,
        {
            $set:
            {
                cartProducts: newCart,
                totalProducts: quantity,
                purchaseAmount: purchase
            }
        }, { new: true });

        res.status(201).json(updatedUser);
    }
    catch (error)
    {
        console.log('Error: ', error);
        res.status(400).json({ error: error.message });
    }
};

userController.update = async (req, res) =>
{
    const user = req.body;
    
    const idReq = user._id;

    try
    {
        await User.findByIdAndUpdate( idReq,
        {
            $set:
            {
                type: user.type,
                email: user.email,
                username: user.username,
                name: user.name,
                gender: user.gender,
                street: user.street,
                number: user.number,
                zipCode: user.zipCode,
                phone: user.phone,
                cartProducts: user.cartProducts,
                purchaseHistory: user.purchaseHistory,
                totalProducts: user.totalProducts,
                purchaseAmount: user.purchaseAmount
            }   
        });

        res.status(201).json(user);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

userController.delete = async (req, res) =>
{
    const idReq = req.params.id;

    try
    {
        await User.findOneAndDelete( { id: idReq } )

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

export default userController;