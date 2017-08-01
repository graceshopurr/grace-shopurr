const { expect } = require('chai')
var Promise = require('bluebird');
const db = require('../index')
const Product = db.model('product')

describe('Cat model', () => {
    beforeEach('Synchronize and clear database', () => db.sync({
        force: true
    }));
    after('Synchronize and clear database', () => db.sync({
        force: true
    }));

    describe('Product Model', () => {


        describe('has the expected schema design', () => {

            it('has a product name', () => {
                expect(Product.attributes.name).to.be.an('object');
            })
            it('has a product description', () => {
                expect(Product.attributes.age).to.be.an('object');
            })
            it('has a product price', () => {
                expect(Product.attributes.age).to.be.an('object');
            })

        });

        describe('validations', () => {
            it('requires a product name', () => {
                const product = Product.build();
                // cat.name = null;
                return product.validate()
                    .catch(function (result) {
                        // console.log('in .catch')
                        expect(result).to.be.an.instanceOf(Error);
                        expect(result.message).to.contain('name cannot be null');

                    })
            });

            it('price has a default value', () => {
                // console.log("thing",Product.attributes);
                expect(Product.attributes.price.defaultValue).to.deep.equal(0);
            });

            it('image has a default image', () => {
                expect(Product.attributes.imageUrl.defaultValue).to.deep.equal('/assets/images/package.png');
            });

        });




    });//ends validations

 }); //ends product model 