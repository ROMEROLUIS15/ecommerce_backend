const request = require('supertest')
const app = require('../app')
require('../models')

let id;
let token;

beforeAll(async() => {
    const credentials = {
        email: 'test@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
})


test('GET /products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const newProduct = {
        title: "Tama Speed ​​Cobra 910 Double Bass Drum Pedal",
        description: "Few pedals have been as instantly popular as Tama's Speed ​​Cobra.",
        brand: "Tama",
        price: "$ 219",
    }
    const res = await request(app)
    .post('/products')
    .send(newProduct)
    .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body. title).toBe(newProduct.title);
    expect(res.body.id).toBeDefined();
});


test('GET /products/:id should return a city by id', async () => {
    const res = await request(app).get(`/products/${id}`)
    expect(res.status).toBe(200)
})


test('PUT /products/:id', async () => {
    const updatedProduct = { title: 'Drums test' };
    const res = await request(app).put(`/products/${id}`).send(updatedProduct)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedProduct.name);
   });


test('DELETE /products', async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});