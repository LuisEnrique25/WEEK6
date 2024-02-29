const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');


const getAll = catchError(async(req, res) => {

    const { category } = req.query;

    const where = {};

    if(category) where.categoryId = category;

    const results = await Product.findAll({
        include: [Category, ProductImg],
        //where: { categoryId: category.id }
        where
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, {include: [Category, ProductImg]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setImage = catchError(async(req, res) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    if(!product) return res.sendStatus(404);

    await product.setProductImgs(req.body);
    const images = await product.getProductImgs()

    return res.json(images)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setImage
}