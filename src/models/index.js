const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");

Product.belongsTo(Category); // se agrega el campo categoryId
Category.hasMany(Product);
