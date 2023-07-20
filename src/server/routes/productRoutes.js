"use strict";

import express from 'express';
import productController from '../controllers/productControler.js';

const router = express.Router();

router.route("/products").get(async (req, res) => await productController.getAll(req, res));

router.route("/products/:id").get(async (req, res) => await productController.getById(req, res));

router.route("/products").post(async (req, res) => await productController.create(req, res));

router.route("/products").put(async (req, res) => await productController.update(req, res));

router.route("/products/:id").delete(async (req, res) => await productController.delete(req, res));

export default router;