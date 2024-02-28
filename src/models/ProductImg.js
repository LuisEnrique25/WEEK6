const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('productImg', {
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //productImg
    },
    {
        timestamps: false //evita que se crean los campos createdAt y updatedAt
    }
);

module.exports = ProductImg;