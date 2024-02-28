const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User')
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require("../models")

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Cart.findAll({
        where: { userId },
        include: [{
            model: Product,
            attributes: { exclude: ["updatedAt", "createdAt"] },
            include: {
                model: Category,
                attributes: ["name"]
            }},
            {
                model: ProductImg
            }
        ] 
    });
    return res.json(results);
});


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const results = await Cart.findByPk(id, {
        where: { userId },
        include: [{
            model: Product,
            attributes: { exclude: ["updatedAt", "createdAt"] },
            include: {
                model: Category,
                attributes: ["name"]
            }
            },
            {
                model: ProductImg
            }
        ]
    });
    if(!results) return res.sendStatus(404);
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;

    const {quantity, productId } = req.body;
    const newBody = {userId, quantity, productId};

    const result = await Cart.create(newBody);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await Cart.destroy({ where: {id, userId} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;
    const result = await Cart.update(
        { quantity},
        { where: {id, userId}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update
}