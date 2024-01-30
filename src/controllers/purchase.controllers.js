const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');
const Image =  require("../models/Image");

const getAll = catchError(async(req, res) => {
    const { id } = req.user;
    const result = await Purchase.findAll( 
        { include: [{
            model: Product,
            include: [Image],
        }],
           where: { userId: id }  
        }
    );
    return res.json(result);
});

const createAndDelete = catchError(async(req,res)=>{
    const productsCart = await ProductCart.findAll({ 
        where: { userId: req.user.id },
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(productsCart);
    await ProductCart.destroy({ where: { userId: req.user.id }})
    return res.json(purchases);
})


//CONTROLADOR CREADO PARA ELIMINAR COMPRAS DEL FRONTEND
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Purchase.destroy({where: {id}})
    return res.sendStatus(204)
});

module.exports = {
    getAll,
    createAndDelete,
    remove
}