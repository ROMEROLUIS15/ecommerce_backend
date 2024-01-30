const app = require('../app')
const request = require('supertest')
require('../models')

let id;
let token;

beforeAll(async () => {
    const credential = {
        email: 'test@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(credential)
    token = res.body.token
})

test('GET /purchases', async () => {
    const res = await request(app)
    .get('/purchases')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});


//  test('POST /purchases', async () => {
//      const quantityPurchase = {
//          quantity: 7,
//      };
//      const res = await request(app)
//      .post('/purchases')
//      .send(quantityPurchase)
//      .set("Authorization", `Bearer ${token}`)
//      id = res.body.id
//      console.log(res.body)
//      expect(res.status).toBe(201);
//      expect(res.body.quantity).toBe(quantityPurchase.quantity)
//      expect(res.body.id).toBeDefined()
//  });