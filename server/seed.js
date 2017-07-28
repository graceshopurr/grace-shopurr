const db = require('./db');
const Cat = db.model('cat');
const User = db.model('user');
const Review = db.model('review');
const Order = db.model('order');
const Product = db.model('product');

const Promise = require('bluebird');
const chance = require('chance')(123);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

// USERS

let emails = chance.unique(chance.email, 100);

function randUser () {
  let address = chance.address();
  return User.build({
    firstName: chance.first(),
    lastName: chance.last(),
    email: emails.pop(),
    password: chance.word(),
    isAdmin: chance.weighted([true, false], [5, 95]),
    billingAddress: address,
    shippingAddress: address
  });
}

function generateUsers() {
  let users = doTimes(100, randUser);
  users.push(User.build({
    firstName: 'India',
    lastName: 'Amos',
    email: 'india@indiamos.com',
    password: 'india',
    isAdmin: true,
    billingAddress: '5 Hanover Square',
    shippingAddress: '5 Hanover Square'
  }));
  return users;
}

function createUsers(){
  return Promise.map(generateUsers(), function(user) {
    return user.save();
  });
}

// CATS
let catNames = chance.unique(chance.weighted([chance.first, chance.last], [50, 50]), 20);

let images = [
'http://24.media.tumblr.com/tumblr_lrpq0bDK6k1qmf9gqo1_500.jpg',
'http://25.media.tumblr.com/tumblr_lnq2odAEFo1qbt33io1_1280.jpg',
'http://24.media.tumblr.com/tumblr_lw13kiYUeF1qb0lplo1_1280.jpg',
'http://25.media.tumblr.com/tumblr_m3qr1tGWTd1rulzago1_1280.jpg',
'http://24.media.tumblr.com/tumblr_lg2i0ydRHa1qzfa5ao1_250.gif',
'http://25.media.tumblr.com/tumblr_li3x10qgh01qgnva2o1_500.jpg',
'http://24.media.tumblr.com/tumblr_mbj1ha8iHl1qz4dkmo1_1280.jpg',
'http://24.media.tumblr.com/tumblr_m2sv3mAFgE1r73wdao1_500.jpg',
'http://25.media.tumblr.com/tumblr_lh0dek4YMo1qgnva2o1_500.jpg',
'http://25.media.tumblr.com/tumblr_m40sklbpqT1qio8k4o1_1280.jpg',
'http://24.media.tumblr.com/tumblr_lhazbvuK4d1qbd47zo1_1280.jpg',
'http://25.media.tumblr.com/tumblr_lpcqdgAWYP1qbhms5o1_500.jpg',
'http://25.media.tumblr.com/tumblr_lzdaxhuPsf1qhy6c9o1_500.gif',
'http://24.media.tumblr.com/tumblr_lofr2huoAP1qij6yko1_1280.jpg',
'http://24.media.tumblr.com/tumblr_ls5a7ycMgN1r1lkdko1_500.jpg',
'http://24.media.tumblr.com/tumblr_lg90acBdUF1qfyzelo1_1280.jpg',
'http://25.media.tumblr.com/Xxv0OgwjZpebpj28yZILXEXNo1_1280.jpg',
'http://24.media.tumblr.com/tumblr_m13l6nOPr51r6b7kmo1_1280.jpg',
'http://25.media.tumblr.com/tumblr_m0ty9q74wq1qhupl9o1_1280.jpg',
'http://24.media.tumblr.com/tumblr_lwgyvtZTRT1qhpojco1_500.jpg'
];

function randCat () {
  return Cat.build({
    name: catNames.pop(),
    imageURL: images.pop(),
    age: chance.natural({min: 0, max: 30}),
    description: chance.sentence(),
    gender: chance.weighted(['female', 'male', 'nonbinary'], [35, 35, 30]),
    status: chance.weighted(['available', 'adopted', 'pending'], [60, 20, 20]),
    specialNeeds: chance.weighted([true, false], [25, 75])
  });
}

function generateCats () {
  let cats  = doTimes(20, randCat);
  cats.push(Cat.build({
    name: 'Gus',
    imageURL:'https://lh3.googleusercontent.com/-kKp7ceG98L0/WXoMdAYqanI/AAAAAAAAEdM/DprsNxHPo7EULiwQouR4SHnJ30q3UzVDQCL0BGAYYCw/h2048/462638bd-f93f-4088-b547-c83a7cee677a',
    age: '4',
    description: 'Sarah\'s Cat',
    gender: 'female',
    status: 'adopted',
    specialNeeds: 'false',
    userid: '101'
  }));
  return cats;
}

function createCats () {
  return Promise.map(generateCats(), function (cat) {
    return cat.save();
  });
}

// REVIEWS

function randReview () {
  return Review.build({
    status: chance.weighted(['pending', 'approved'], [10, 90]),
    review: chance.paragraph(),
    rating: chance.weighted([1, 2, 3], [40, 40, 20])
  });
}

// function generateReviews () {
//   let reviews = doTimes()
// }

// PRODUCTS

function randProduct () {
  return Product.build({
    name: chance.word(),
    description: chance.paragraph(),
    price: chance.natural({min: 1, max: 1000}),
    inventory: chance.natural({min: 0, max: 10000})
  });
}

function generateProducts () {
  let products = doTimes(50, randProduct);
  products.push(Product.build({
    name: 'Catnip',
    description: 'cat weed',
    price: 5,
    inventory: 1000
  }));
  return products;
}

function createProducts () {
  return Promise.map(generateProducts(), function (product) {
    return product.save();
  });
}

// ORDER

function randOrder () {
  return Order.build({
    status: chance.weighted(['pending','shipped','delivered', 'canceled'], [25, 25, 25, 25]),
    cats: [],
    products: []
  });
}

function generateOrders () {
  let orders = doTimes(10, randOrder);
  orders.push(Order.build({
    status: 'delivered',
    cats: ['21'],
    products: []
  }));
  return orders;
}

function createOrders () {
  return Promise.map(generateOrders(), function (order) {
    return order.save();
  });
}

//SEEDING

function seed() {
  let arr = [createUsers(), createCats(), createProducts(), createOrders()];
  return Promise.all(arr);
}

console.log('Syncing database');

db.sync({force: true})
.then(() => {
  console.log('Seeding database');
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});
