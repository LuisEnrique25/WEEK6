require("../models");
const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");

const URL_PRODUCTS = '/products';
const URL_USERS = '/users';

let productId;
let TOKEN;
let category;

let product;

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

    // crear categoria para que exista minimo un id y poder agregarlo al product

    category = await Category.create({ name: "Sonido"});

    //asignar product para poder usarlo en los tests
    product ={
        title: "Bocina",
        description: "alguna description bla bla bla",
        price: 524,
        categoryId: category.id
    };
});


//-------Test POST-CREATE-----------
test("Post -> 'URL_PRODUCTS', should return status code 201, res.body to be defined and res.body.title its equal to product.title", async() => {
    const res = await request(app)
        .post(URL_PRODUCTS)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id;
    console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

//-------Test GET ALL---------------
test("Get -> 'URL_PRODUCTS', should return status code 200, res.body to be defined, res.body[0].category to be defined, res.body[0].category.id equals to category.id  and res.body have length to 1 ", async() => {
    const res = await request(app)
        .get(URL_PRODUCTS)

    //recordar importar el archivo index.js de models para que se cree la relacion, de lo contrario retornara un status 500
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
    
        
    expect(res.body[0].category).toBeDefined();
    expect(res.body[0].category.id).toBe(category.id);
    /*
    */

});

//------------Test Get All by Category
test("GET -> 'URL_PRODUCTS', should return status code 200, res.body to be defined, and res.body.length ==== 1, res.body[0].categoryId === category.id , and res.body[0].category.id === category.id", async() => {
    const res = await request(app)
        .get(`${URL_PRODUCTS}?category=${category.id}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    expect(res.body[0].categoryId).toBe(category.id);
    expect(res.body[0].category.id).toBe(category.id);
});

//-------Test GET ONE---------------
test("Get -> 'URL_PRODUCTS/:id', should return status code 200, res.body.category to be defined, res.body.category.id equals to category.id, res.body to be defined and res.body.title its equal to product.title", async() => {
    const res = await request(app)
        .get(`${URL_PRODUCTS}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(product.title);

    expect(res.body.category).toBeDefined();
    expect(res.body.category.id).toBe(category.id)
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

    await category.destroy();
});