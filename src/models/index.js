const Product = require("./Product");
const Category = require("./Category");
const Image = require("./Image");
const ProductCart = require("./ProductCart");
const User = require('./User');
const Purchase = require("./Purchase");

Product.belongsTo(Category)
Category.hasMany(Product)

Product.hasMany(Image)
Image.belongsTo(Product)

ProductCart.belongsTo(User)
User.hasMany(ProductCart)

ProductCart.belongsTo(Product)
Product.hasMany(ProductCart)

Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)
