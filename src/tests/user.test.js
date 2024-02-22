const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const URL_USERS = "/users";
let userId;
let TOKEN;

const user ={
    firstName: 'Enrique',
    lastName: 'Gonzalez',
    email: 'enrique@gmail.com',
    password: 'enrique12345',
    phone: '1234567890'
}

const newNameUser = {
    firstName: 'newName'
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


//-------Test PUT--------------
test("Put -> 'URL_USERS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = newNameUser.firstName", async() => {
    const res = await request(app)
        .put(`${URL_USERS}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newNameUser)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(newNameUser.firstName);
});

//-----------TEST LOGIN---------------
test("Post -> 'URL_USERS/login', should return status 200, res.body to be defined,  res.body.email === user.email and res.body.token to be defined", async() => {

    const userLogin = {
        email: 'enrique@gmail.com',
        password: 'enrique12345'
    }

    const res = await request(app)
        .post(`${URL_USERS}/login`)
        .send(userLogin)
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.user.email).toBe(userLogin.email);
    expect(res.body.token).toBeDefined();
});

//-----------TEST FAIL LOGIN----------------
test("Post login fail -> 'URL_USERS/login', should return status 401", async() => {
    const failUserLogin = {
        email: 'enrique@gmail.com',
        password: 'failpassword'  //fail password
    }
    const res = await request(app)
        .post(`${URL_USERS}/login`)
        .send(failUserLogin) 

    expect(res.statusCode).toBe(401);
})

//-------Test DELETE--------------
test("Delete -> 'URL_USERS', should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_USERS}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(204);
});