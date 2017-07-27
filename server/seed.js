const db = require('./db');
const Cat = db.model('cat');
const User = db.model('user');
const Review = db.model('review');
const Order = db.model('order');
const DonationProduct = db.model('donationProduct');

const Promise = require('bluebird');
const chance = require('chance')(123);

let emails = chance.unique(chance.email, 100);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

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

function seed() {
  return createUsers();
}

console.log('Syncing databse');

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
