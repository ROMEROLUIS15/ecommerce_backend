const { getAll, createAndDelete, remove } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/purchases')
    .get(verifyJWT, getAll)
    .post(verifyJWT, createAndDelete)

purchaseRouter.route('/purchases/:id')
    .delete(remove)

module.exports = purchaseRouter;