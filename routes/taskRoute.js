"use strict";
const BearerAuthorization = require("../components/authorizationBearer");
const Express = require("express");
const Controller = require("./../controllers/TaskController");
const BASE_URL = "/v1/task";

module.exports = Express.Router({
  mergeParams: true
})
  .get(`${BASE_URL}/get/`, BearerAuthorization, Controller.getAll)
  .get(`${BASE_URL}/get/:id`, BearerAuthorization, Controller.getById)
  .get(`${BASE_URL}/update/:id`, BearerAuthorization, Controller.update)
  .post(`${BASE_URL}/create/`, BearerAuthorization, Controller.create);
