"use strict";

var response = require("../components/response");
var identity = require("../components/identity");

const { todo  } = require("../models/index");

exports.getAll = async function(req, res, next) {
  await todo
    .findAll()
    .then(function(task) {
      if (!task) {
        response.responseNotFound("", "incorrect task name", res);
        next();
      } else {
        response.responseSuccess(task, res);
      }
    })
    .catch(function(err) {
      response.responseNotValidate("", err.message, res);
      return;
    });
};

exports.create = async function(req, res, next) {
  let name = req.body.name;
  let description = req.body.description;
  let created_by = identity.getId();

  const newTask = await todo
    .findOrCreate({
      where: {
        name: name,
        description: description,
        created_by: created_by
      }
    })
    .spread(function(task, created) {
      if (created) {
        let data = {
          name: task.name,
          description: task.description,
          created_by: task.created_by
        };
        response.responseSuccess(data, res);
        return;
      } else {
        // in case u have unique constraint
         response.responseSuccess(task, res);
        return;
      }
    })
    .catch(function(err) {
      console.log(err);
      console.log(err);

      // console.log(err.message);
      response.responseNotValidate(err.name, err.errors[0].message, res);
      return;
    });
};

exports.update = async function(req, res, next) {};

exports.getById = async function(req, res, next) {
  let idCat = req.params.id;
  await todo
    .findOne({
      where: {
        id: idCat
      }
    })
    .then(function(task) {
      if (!task) {
        response.responseNotFound("", "incorrect task name", res);
        next();
      } else {
        response.responseSuccess(task, res);
      }
    })
    .catch(function(err) {
      response.responseNotValidate("", err.message, res);
      return;
    });
};
