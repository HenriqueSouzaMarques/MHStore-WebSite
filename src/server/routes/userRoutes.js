"use strict";

import express from 'express';

import userController from '../controllers/userController.js';

const router = express.Router();

router.route("/users").get(async (req, res) => await userController.getAll(req, res));

router.route("/users/:id").get(async (req, res) => await userController.getById(req, res));

router.route("/users").post(async (req, res) => await userController.auth(req, res));

router.route("/users/:productId/:size/:qtd").put(async (req, res) => await userController.addProductToCart(req, res));

router.route("/users").put(async (req, res) => await userController.update(req, res));

router.route("/users/:id").delete(async (req, res) => await userController.delete(req, res));

export default router;