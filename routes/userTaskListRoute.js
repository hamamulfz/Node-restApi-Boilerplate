"use strict";
const BearerAuthorization = require("../components/authorizationBearer");
const Express = require("express");
const Controller = require("./../controllers/UserTaskListController");
const BASE_URL = "/v1/user-task-list";

module.exports = Express.Router({
  mergeParams: true
})
  .get(`${BASE_URL}/get/`, BearerAuthorization, Controller.getAll)
  .post(`${BASE_URL}/create/`, BearerAuthorization, Controller.create);
