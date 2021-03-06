
const User = require('./user');
const Cat = require('./cat');
const Product = require('./product');
const Order = require('./order');
const Review = require('./review');


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */



 Order.belongsTo(User);
 // Order.hasMany(Cat);
 // Order.hasMany(Product);

 Review.belongsTo(Cat);
 Review.belongsTo(User);

 Cat.belongsTo(User);

 User.hasMany(Order);
 User.hasMany(Review);

 // Cat.hasMany(Review);
 // Cat.belongsTo(Order);

 Product.hasMany(Order);
 Order.belongsTo(Cat);


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Cat, Product, Order, Review
}
