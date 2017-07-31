const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
var agent = request.agent(app);
const Product = db.model('product')

describe('Product routes', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  });

  describe('/api/products', () => {

    beforeEach(() => {
      return Product.create({
        name: 'Catnip',
        description: 'cat weed',
        price: 500,
        inventory: 1000,
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Nepeta_cataria_Sturm24.jpg'
      })
      .then(product1 => {
        return Product.create({
          name: 'Cat Dancer',
          description: 'The best thing ever',
          price: 600,
          inventory: 100,
          imageURL: 'http://media12.mediazs.com/bilder/cat/dancer/cat/toy/5/400/53626_PLA_Schulze_Cat_Dancer_5.jpg'
        })
      })
    })

    it('GET /api/products shows all products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].description).to.equal('cat weed');
          expect(res.body[1].description).to.equal('The best thing ever');
        })
    })

    it('GET /api/products/:id shows a particular product', () => {
      return request(app)
        .get('/api/products/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.equal('Cat Dancer');
        })
    })

    it('GET /api/products/:id returns null if passed an ID that doesn’t exist', () => {
      return request(app)
        .get('/api/products/99')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.null;
      })
    })

    it('POST /api/products creates a product', () => {
      return agent
      .post('/api/products')
      .send({
        name: 'Kong ZoomGroom',
        description: 'Feels just like dear old mama cat’s tongue',
        price: 700,
        inventory: 100,
        imageURL: 'https://1mpr64kkw06av2tn1d975o3k-wpengine.netdna-ssl.com/wp-content/uploads/2012/03/catZoomGroom-700x700.jpg'
      })
      .expect(201)
      .expect(function (res) {
        expect(res.body.id).to.not.be.an('undefined');
        expect(res.body.name).to.equal('Kong ZoomGroom');
      });
    })

    it('PUT /api/products/:id updates a product', () => {
      return agent
      .put('/api/products/2')
      .send({
        description: 'Spring steel wire and rolled cardboard create an irresistible lure for cats and great fun for cat lovers.'
      })
      .expect(200)
      .expect(function(res) {
        expect(res.body.updateResponse.id).to.not.be.an('undefined');
        expect(res.body.updateResponse.name).to.equal('Cat Dancer');
        expect(res.body.updateResponse.description).to.equal('Spring steel wire and rolled cardboard create an irresistible lure for cats and great fun for cat lovers.');
      });
    })

    it('DELETE /api/products/:id deletes a product', () => {
      return agent
      .delete('/api/products/1')
      .expect(200)
      .then(res => {
        Product.findById(1)
        .then(function(destroyed) {
          expect (destroyed).to.be.null;
        })
      })
    })
  })
})
