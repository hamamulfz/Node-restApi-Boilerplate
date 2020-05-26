"use strict";

var response = require("../components/response");
var identity = require("../components/identity");

const { task, task_list, user_task_list } = require("../models/index");

exports.getAll = async function(req, res, next) {
  await task_list
    .findAll({
      include: [
        {
          model: user_task_list,
          attributes: ["userId", "task_id", "task_list_id", "is_complete"]
        }
      ]
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

exports.create = async function(req, res, next) {
  let name = req.body.name;
  let description = req.body.description;
  let created_by = identity.getId();
  let task_id = req.body.task_id;

  const newTask = await task_list
    .findOrCreate({
      where: {
        task_id: task_id,
        name: name,
        description: description,
        created_by: created_by
      }
    })
    .spread(function(task, created) {
      if (created) {
        let data = {
          id: task.id,
          task_id: task.task_id,
          name: task.name,
          description: task.description,
          created_by: task.created_by
        };
        response.responseSuccess(task, res);
        return;
      } else {
        response.responseNotValidate("", "task name already exist", res);
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
  await task
    .findOne({
      where: {
        id: idCat
      },
      include: [
        {
          model: task_list
        }
      ]
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
