const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");

Product.belongsTo(Category); // se agrega el campo categoryId
Category.hasMany(Product);


//Cart + User => userId en tabla products
Cart.belongsTo(User);
User.hasMany(Cart);

//Cart + Product => productId en tabla products
Cart.belongsTo(Product);
Product.hasMany(Cart);