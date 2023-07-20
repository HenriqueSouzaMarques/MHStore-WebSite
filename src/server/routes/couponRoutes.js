"use strict";

import express from 'express';
import couponController from '../controllers/couponController.js';

const router = express.Router();

router.route("/coupon").get(async (req, res) => await couponController.getAll(req, res));

router.route("/coupon/:name").get(async (req, res) => await couponController.getByName(req, res));

router.route("/coupon").post(async (req, res) => await couponController.create(req, res));

router.route("/coupon/:id").put(async (req, res) => await couponController.update(req, res));

router.route("/coupon/:id").delete(async (req, res) => await couponController.delete(req, res));


export default router;