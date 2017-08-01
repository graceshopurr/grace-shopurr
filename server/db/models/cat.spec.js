const { expect } = require('chai')
var Promise = require('bluebird');
const db = require('../index')
const Cat = db.model('cat')
const User = db.model('user');

describe('Cat model', () => {
    beforeEach('Synchronize and clear database', () => db.sync({
        force: true
    }));
    after('Synchronize and clear database', () => db.sync({
        force: true
    }));

    describe('Cat Model', () => {


        describe('has the expected schema design', () => {

            it('has a cat name', () => {
                expect(Cat.attributes.name).to.be.an('object');
            })
            it('has a cat age', () => {
                expect(Cat.attributes.age).to.be.an('object');
            })

        });

        describe('validations', () => {
            it('requires a cat name', () => {
                const cat = Cat.build();
                // cat.name = null;
                return cat.validate()
                    .catch(function (result) {
                        // console.log('in .catch')
                        expect(result).to.be.an.instanceOf(Error);
                        expect(result.message).to.contain('name cannot be null');

                    })
            });

            it('specialNeeds is a boolean', () => {
                const cat = Cat.build({
                    name: 'Sal',
                    specialNeeds: 'true'
                })
                return cat.validate()
                    .then(newCat => {
                        expect(newCat.dataValues.specialNeeds).to.be.an('Boolean')
                    })

            });

        });

        //not quite working 
        // describe('associations', function () {

        //     it.only("belongs to a user ", function () {

        //         var creatingUser = User.create({
        //             email: 'test@aol.com'
        //         });
        //         var creatingCat = Cat.create({
        //             name: 'Blue Wizard'
        //         });
        //         return Promise.all([creatingUser, creatingCat])
        //             .spread(function (createdUser, createdCat) {
        //                 console.log('foundcat', createdCat)
        //                 return createdCat.userId(createdUser);
        //             })
        //             .then(function () {
        //                 return Cat.findOne({
        //                     where: {
        //                         title: 'Blue Wizards'
        //                     },
        //                     include: {
        //                         model: User
        //                     }
        //                 });
        //             })
        //             .then(function (foundCat) {                       
        //                 expect(foundCat.userId).to.exist; 
        //                 expect(foundCat.userId.email).to.equal('test@aol.com');
        //             });
        //     });
        // });

    });
})
