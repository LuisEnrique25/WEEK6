require("../models");
const request = require("supertest");
const app = require("../app");
const { use } = require("../routes");
const Product = require("../models/Product");

const URL_USERS = '/users';
const URL_CART = '/cart'
const URL_PURCHASE = '/purchase'

let TOKEN;
let userId;
let productBody;
let product;
let cartBody;


beforeAll(async() => {
    const user = {
        email: 'luis@gmail.com',
        password: 'luis12345'
    }

    //inicio de secion

    const res = await request(app)
        .post(`${URL_USERS}/login`)
        .send(user)
    
    TOKEN = res.body.token;
    userId = res.body.user.id;

    // crear producto

    productBody = {
        title: 'Balon',
        description: 'algun balon de alguna marca',
        price: 58.98
    }
    product = await Product.create(productBody);


    //crear Cart
    cartBody = {
        productId : product.id,
        quantity: 3
    }

    await request(app)
        .post(URL_CART)
        .send(cartBody)
        .set('Authorization', `Bearer ${TOKEN}`)
});


//----------Test Post----------------
test("Post => 'URL_PURCHASE', should return status code 201, res.body to be defined and res.body.quantity equals to cartBody.quantity", async() => {
    const res = await request(app)
        .post(URL_PURCHASE)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body[0].quantity).toBe(cartBody.quantity)

    
});

//----------Test Get All------------------
test("Get => 'URL_PURCHASE', should return status 200, res.body to be defined and res.body.length to be 1", async() => {
    const res = await  request(app)
        .get(URL_PURCHASE)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    expect(res.body[0].productId).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);

    expect(res.body[0].userId).toBeDefined();
    expect(res.body[0].userId).toBe(userId);
    
    await product.destroy()
});