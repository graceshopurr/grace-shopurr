const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
var agent = request.agent(app);
const Order = db.model('order');

describe('Order routes', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  });

  describe('/api/orders', () => {

    beforeEach(() => {
      return Order.create({
        status: 'cart',
        date: '01/20/2015',
        quantity: 5
      })
      .then(order1 => {
        return Order.create({
            status: 'processing',
            date: '01/20/2013',
            quantity: 2
        })
      })
    })

    it('GET /api/orders shows all orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].status).to.equal('cart');
          expect(res.body[1].status).to.equal('processing');
        })
    })

    it('GET /api/orders/:id shows a particular Order', () => {
      return request(app)
        .get('/api/orders/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.quantity).to.equal(2);
        })
    })

    it('GET /api/orders/:id returns null if passed an ID that doesn’t exist', () => {
      return request(app)
        .get('/api/orders/9912')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.null;
      })
    })

    it('POST /api/orders creates a order', () => {
      return agent
      .post('/api/orders')
      .send({
        status: 'pending',
        date: '01/21/2010',
        quantity: 51
      })
      .expect(201)
      .expect(function (res) {
        expect(res.body.id).to.not.be.an('undefined');
        expect(res.body.date).to.equal('2010-01-21T05:00:00.000Z');
      });
    })

    it('PUT /api/orders/:id updates a order', () => {
      return agent
      .put('/api/orders/2')
      .send({
        status: 'shipped'
      })
      .expect(200)
      .expect(function(res) {
        //   console.log(res.body)
        expect(res.body.updatedResponse.id).to.not.be.an('undefined');
        expect(res.body.updatedResponse.status).to.equal('shipped');
        expect(res.body.updatedResponse.quantity).to.equal(2);
      });
    })

    it('DELETE /api/orders/:id deletes a order', () => {
      return agent
      .delete('/api/orders/1')
      .expect(200)
      .then(res => {
        Order.findById(1)
        .then(function(destroyed) {
          expect (destroyed).to.be.null;
        })
      })
    })
  })
})
