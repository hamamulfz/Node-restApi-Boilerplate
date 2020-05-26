"use strict";

var response = require("../components/response");
var identity = require("../components/identity");

const { task, task_list, user, user_task_list } = require("../models/index");

exports.getAll = async function(req, res, next) {
  await task
    .findAll({
      include: [
        {
          model: task_list,
          attributes: ["name", "description"]
          //   include: [
          //     {
          //       model: user_task_list
          //     }
          //   ]
        },
        // {
        //   model: user_task_list
        // },
        {
          model: user,
          attributes: ["username", "email"]
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

  let userId = identity.getId();

  const newTask = await task
    .findOrCreate({
      where: {
        name: name,
        description: description,
        created_by: userId
      }
    })
    .spread(function(task, created) {
      if (created) {
        let data = {
          id: task.id,
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
exports.update = async function(req, res, next) {
  let id = identity.getId();
  console.log(id);
  let taskId = req.params.id;
  let taskName = req.params.task_name;
  let taskDescription = req.params.task_description;

  try {
    const taskDetail = await task.findOne({
      where: { id: taskId },
      include: [
        {
          model: task_list,
          attributes: ["id", "name", "description"]
        }
      ]
    });

    if (taskDetail.created_by != id) {
      response.responseNotValidate(
        "please contact the task creator to edit",
        error,
        res
      );
      return;
    }

    taskDetail.name = taskName;
    taskDetail.description = taskDescription;
    taskDetail.save();

    response.responseUpdated(taskDetail, "", res);
    return;
  } catch (error) {
    console.log(error);
    response.responseFailed("bad request or no user exist", error, res);
    next();
  }
};

exports.getById = async function(req, res, next) {
  let idTask = req.params.id;
  await task
    .findOne({
      where: {
        id: idTask
      },
      include: [
        {
          model: task_list
        }
      ]
    })
    .then(function(task) {
      if (!task) {
        response.responseNotFound("", "incorrect task id", res);
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
