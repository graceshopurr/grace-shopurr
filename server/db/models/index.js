
const User = require('./user');
const Cat = require('./cat');
const DonationProduct = require('./donationProduct');
const Order = require('./order');
const Review = require('./review');



/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */



 Order.belongsTo(User);

 Review.belongsTo(DonationProduct);
 Review.belongsTo(User);

 Cat.belongsTo(User);

 User.hasMany(Order);
 User.hasMany(Review);

 DonationProduct.hasMany(Review); 

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Cat, DonationProduct, Order, Review
}
