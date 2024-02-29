const { getAll } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const { create, remove } = require('../controllers/productImgCloudinary.controllers');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create)

routerProductImg.route('/:id')
    .delete(remove)

module.exports = routerProductImg;