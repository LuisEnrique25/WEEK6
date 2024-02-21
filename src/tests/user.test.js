const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const URL_USERS = "/users";
let userId;

const user ={
    firstName: 'Enrique',
    lastName: 'Gonzalez',
    email: 'enrique@gmail.com',
    password: 'enrique@gmail.com',
    phone: '1234567890'
}
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
    
})



//-------Test GET ALL-----------
test("Get -> URL_USERS, should return statusCode 200, res.body to be defined and res.body.length = 1", async() => {
    const res = await request(app)
        .get(URL_USERS)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});


//-------Test POST-CREATE-----------
test("Post 'URL_USERS', should return statusCode 201,and res.body to be defined and res.body.firstName = user.firstName", async() => {
    const res = await request(app)
        .post(URL_USERS)
        .send(user)
    userId = res.body.id;
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

