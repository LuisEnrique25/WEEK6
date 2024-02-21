const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');

const routerUser = express.Router();

routerUser.route('/')
    .get(getAll)
    .post(create)

routerUser.route("/login")
    .post(login)

routerUser.route('/:id')
    .delete(remove)
    .put(update);

module.exports = routerUser;