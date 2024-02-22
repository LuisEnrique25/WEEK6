const request = require("supertest");
const app = require("../app");

const URL_PRODUCTS = '/products';
const URL_USERS = '/users';

let productId;
let TOKEN;

const product = {
        title: "Bocina",
        description: "alguna description bla bla bla",
        price: 524
};

const newProductName = {
    title: "Stereo"
};

//simular primero el login para los endpoints privados

beforeAll(async () => {
    const user = {
        email: 'luis@gmail.com',
        password: 'luis12345'
    };

    const res = await request(app)
        .post(`${URL_USERS}/login`)
        .send(user)
    
    TOKEN = res.body.token;
});


//-------Test POST-CREATE-----------
test("Post -> 'URL_PRODUCTS', should return status code 201, res.body to be defined and res.body.title its equal to product.title", async() => {
    const res = await request(app)
        .post(URL_PRODUCTS)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

//-------Test GET ALL---------------
test("Get -> 'URL_PRODUCTS', should return status code 200, res.body to be defined and res.body have length to 1 ", async() => {
    const res = await request(app)
        .get(URL_PRODUCTS)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});



//-------Test GET ONE---------------
test("Get -> 'URL_PRODUCTS/:id', should return status code 200, res.body to be defined and res.body.title its equal to product.title", async() => {
    const res = await request(app)
        .get(`${URL_PRODUCTS}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

//------Test PUT -> UPDATE----------
test("Put -> 'URL_PRODUCTS/:id', should return status code 200, res.body to be defined and res.body.title equals to newProductName.title", async() => {
    const res = await request(app)
        .put(`${URL_PRODUCTS}/${productId}`)
        .send(newProductName)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(newProductName.title);
});

//-------Test DELETE----------------
test("Delete -> 'URL_PRODUCTS/:id', should return status code 204", async() => {
    const res = await request(app)
        .delete(`${URL_PRODUCTS}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204);
});