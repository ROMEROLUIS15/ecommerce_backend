const catchError = require('../utils/catchError');
const ProductCart = require('../models/ProductCart');
const Product = require('../models/Product')
const Image =  require("../models/Image");


const getAll = catchError(async(req, res) => {
    const { id } = req.user;
    const results = await ProductCart.findAll( 
        { include: [{
            model: Product,
            include: [Image],
        }],
           where: { userId: id }  
        }
    );
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const { quantity, productId } = req.body
    const result = await ProductCart.create({
        quantity,
        productId,
        userId,
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductCart.findByPk( id,
        { include: [{
            model: Product,
            include: [Image],
        }],
           where: { userId: id }  
        });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await ProductCart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductCart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}