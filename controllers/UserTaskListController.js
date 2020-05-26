"use strict";

var response = require("../components/response");
var identity = require("../components/identity");

const { Op } = require("sequelize");

const { task, task_list, user, user_task_list } = require("../models/index");

exports.getAll = async function(req, res, next) {
  await user_task_list
    .findAll({
      //   include: [
      //     {
      //       model: task_list
      //     },
      //     {
      //       model: user_task_list
      //     },
      //   ]
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
  let userId = req.body.user_id;
  let task_id = req.body.task_id;
  let task_list_id = req.body.task_list_id;

  const newTask = await user_task_list
    .findOrCreate({
      where: {
        task_id: task_id,
        userId: userId,
        task_list_id: task_list_id
      }
    })
    .spread(function(task, created) {
      if (created) {
        let data = {
          task_id: task.task_id,
          userId: task.userId,
          task_ist_id: task.task_ist_id
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

exports.kickUser = async function(req, res, next) {
  let userToKick = req.body.user_id;
  let taskId = req.body.task_id;
  let userId = identity.getId();

  await task
    .findOne({
      where: {
        id: taskId
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

  let taskCreatedBy = task.id;
  if (userId != taskCreatedBy) {
    response.responseNotValidate(
      "please contact the task creator to edit",
      error,
      res
    );
    return;
  }

  try {
    user_task_list.destroy({ where: { userId: userToKick, task_id: taskId } });
  } catch (error) {
    response.responseNotValidate("", err.message, res);
    return;
  }
};

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
