const app = require('../app')
const request = require('supertest');
require('../models')

let token;
let id;

beforeAll(async () => {
    const credential = {
        email: 'test@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(credential)
    token = res.body.token
})

test('GET /cart', async () => {
    const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const quantityCart = {
        quantity: 5
    }
    const res = await request(app)
    .post('/cart')
    .send(quantityCart)
    .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(quantityCart.quantity);
    expect(res.body.id).toBeDefined();
});


test('PUT /cart', async () => {
    const cartUpdate = { quantity: 3}
    const res = await request(app)
    .put(`/cart/${id}`)
    .send(cartUpdate)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdate.quantity);
});


test('DELETE /cart/:id', async () => {
    const res = await request(app)
    .delete(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});