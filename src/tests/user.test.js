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

test("Post 'URL_USERS', should return statusCode 201,and res.body to be defined and res.body.firstName = user.firstName", async() => {
    const res = await request(app)
        .post(URL_USERS)
        .send(user)
    userId = res.body.id;
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
})