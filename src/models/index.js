const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Purchase = require("./Purchase");

Product.belongsTo(Category); // se agrega el campo categoryId
Category.hasMany(Product);


//Cart + User => userId en tabla products
Cart.belongsTo(User);
User.hasMany(Cart);

//Cart + Product => productId en tabla products
Cart.belongsTo(Product);
Product.hasMany(Cart);

//Purchase + User => userId en tabla purchase
Purchase.belongsTo(User);
User.hasMany(Purchase);

//Purchase + Product => productId en tabla purchase
Purchase.belongsTo(Product);
Product.hasMany(Purchase);

