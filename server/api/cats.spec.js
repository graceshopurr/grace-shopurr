const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
var agent = request.agent(app);
const Cat = db.model('cat')

describe('Cat routes', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  });

  describe('/api/cats', () => {

    beforeEach(() => {
      return Cat.create({
        name: 'Chow',
        imageURL: 'http://www.readersdigest.ca/wp-content/uploads/2016/05/sickcat.jpg',
        age: 2,
        description: 'She loves to play with a ball of yarn',
        gender: 'female',
        status: 'available',
        specialNeeds: 'false'
      })
      .then(newCat => {
        return Cat.create({
            name: 'Speck',
            imageURL: 'http://d3i6fh83elv35t.cloudfront.net/newshour/wp-content/uploads/2017/04/cat2.jpg',
            age: 10,
            description: 'He enjoys eating and sleeping all day',
            gender: 'male',
            status: 'pending',
            specialNeeds: 'true'
        })
      })
    })

    it('GET /api/cats shows all cats', (done) => {
      request(app)
        .get('/api/cats')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.equal('Chow');
          expect(res.body[1].name).to.equal('Speck');
          done();
        })
    })

     it('GET /api/cats/:id shows a single cat', (done) => {
      request(app)
        .get('/api/cats/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.equal(2);
          expect(res.body.name).to.equal('Speck');
          done();
        })
    })

    it('GET /api/cats/:id return null if no cat id is passed in', (done) => {
      request(app)
        .get('/api/cats/34')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.null;
          done();
        })
    })

    it('POST /api/cats adds a cat', () => {
        return agent
        .post('/api/cats')
        .send({
            name: 'Petey',
            imageURL: 'http://d3i6fh83elv35t.cloudfront.net/newshour/wp-content/uploads/2017/04/cat2.jpg',
            age: 16,
            description: 'He enjoys people watching',
            gender: 'female',
            status: 'pending',
            specialNeeds: 'false'
        })
        .expect(201)
        .expect(function (res) {
            expect(res.body.id).to.not.be.an('undefined');
            expect(res.body.age).to.equal('16');
        });
    })


    it('PUT /api/cats/:id updates a cats information', () => {
        return agent
        .put('/api/cats/2')
        .send({
            status: 'adopted'
        })
        .expect(200)
        .expect(function(res) {
            // console.log('RESPONSE', res)
            expect(res.body.updatedResponse.id).to.not.be.an('undefined');
            expect(res.body.updatedResponse.gender).to.equal('male');
            expect(res.body.updatedResponse.status).to.equal('adopted');
        });
     })

    it('DELETE /api/cats/:id removes a cat', () => {
        return agent
        .delete('/api/cats/1')
        .expect(200)
        .then(res => {
            Cat.findById(1)
            .then(function(destroyed) {
            expect (destroyed).to.be.null;
            })
        })
        })


  })
})
