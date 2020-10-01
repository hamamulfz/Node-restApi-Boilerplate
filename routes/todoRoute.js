"use strict";
const BearerAuthorization = require("../components/authorizationBearer");
const Express = require("express");
const Controller = require("./../controllers/TodoController");
const BASE_URL = "/v1/todo";

module.exports = Express.Router({
  mergeParams: true
})
  .get(`${BASE_URL}/get/`, BearerAuthorization, Controller.getAll)
  .post(`${BASE_URL}/create/`, BearerAuthorization, Controller.create)
  .get(`${BASE_URL}/:id`, BearerAuthorization, Controller.getById);
