const request = require("supertest");
const app = require("../app");

const URL_CATEGORIES = '/categories';
const URL_USERS = '/users';

let categoryId;
let TOKEN;

const category = {
    name: 'category1'
};

//simular primero el login para los endpoints privados
beforeAll(async() => {
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
test("Post 'URL_CATEGORIES', should return statusCode 201,and res.body to be defined and res.body.name = category.name", async() => {
    const res = await request(app)
        .post(URL_CATEGORIES)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    categoryId = res.body.id;
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(category.name);
});

//-------Test GET ALL-----------
test("Get -> URL_CATEGORIES, should return statusCode 200, res.body to be defined and res.body.length = 1", async() => {
    const res = await request(app)
        .get(URL_CATEGORIES)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});


//-------Test DELETE--------------
test("Delete -> 'URL_CATEGORIES', should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_CATEGORIES}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204);
});
