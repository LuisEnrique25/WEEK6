require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

const URL_USERS = '/users';
const URL_CART = '/cart';
let TOKEN;
let bodyCart;
let bodyProduct;
let product;
let userId;
let cartId;
let newQuantity = {
    quantity: 3
};


beforeAll(async() => {
    const user = {
        email: 'luis@gmail.com',
        password: 'luis12345'
    };

    const res  = await request(app)
        .post(`${URL_USERS}/login`)
        .send(user)
    TOKEN = res.body.token;
    userId = res.body.user.id


    bodyProduct = {
        title: 'Camisa',
        description: 'Camisa de lana blanca',
        price: 199
    };

    product = await Product.create(bodyProduct);

    bodyCart = {
        quantity: 2,
        productId: product.id
    };
});

// ------------Test POST --------------
test("Post => 'URL_CART', should return  satatus 201, res.body to be Defined , res.body.quantity === bodyCart.quantity and res.body.userId equals to userId", async() => {
    const res = await request(app)
        .post(URL_CART)
        .send(bodyCart)
        .set('Authorization', `Bearer ${TOKEN}`)

    cartId = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.quantity).toBe(bodyCart.quantity);
    expect(res.body.userId).toBe(userId);

   
});

// ---------------Test GET ALL---------------
test("Get -> 'URL_CART', should return status code 200, res.body to be defined, res.body.lenght to be 1, res.body[0].userId to be defined and equals to userId and res.body[0].productId to be defined and equals to product.id", async() => {
    const res = await request(app)
        .get(URL_CART)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    expect(res.body[0].userId).toBeDefined();
    expect(res.body[0].userId).toBe(userId);

    expect(res.body[0].productId).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);

});

// ---------------Test GET ONE---------------
test("Get -> 'URL_CART/:id', should return status code 200, res.body to be defined, res.body.quanity equals to bodyCart.quantity, res.body.userId to be defined and equals to userId and res.body.productId to be defined and equals to product.id", async() => {
    const res = await request(app)
        .get(`${URL_CART}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.quantity).toBe(bodyCart.quantity);

    expect(res.body.userId).toBeDefined();
    expect(res.body.userId).toBe(userId);

    expect(res.body.productId).toBeDefined();
    expect(res.body.productId).toBe(product.id);

   
});

// ----------Test Put---------------
test("Put -> 'URL_CART/:id', should return status code 200, res.body to be defined, and res.body.quantity equal to be newQuantity.quantity", async() =>{
    const res = await request(app)
        .put(`${URL_CART}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newQuantity)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.quantity).toBe(newQuantity.quantity);

     
});

//-------------------Test Delete----------------
test("Delete => 'URL_CART/:id', should return status 204", async() => {
    
    const res = await request(app)
        .delete(`${URL_CART}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204);
    await product.destroy();
});
