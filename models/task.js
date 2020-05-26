"use strict";
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      tableName: "tasks",
      // individualHooks: true,
      hooks: {
        beforeCreate: (record, options) => {
          record.created_at = Math.floor(Date.now() / 1000);
          record.updated_at = Math.floor(Date.now() / 1000);
        },
        beforeUpdate: (record, options) => {
          record.updated_at = Math.floor(Date.now() / 1000);
        }
      }
    }
  );

  task.associate = function(models) {
    // associations can be defined here
    task.hasMany(models.task_list, {
      foreignKey: "task_id"
    });
    task.belongsTo(models.user, {
      foreignKey: "created_by"
    });
    // task.belongsToMany(models.task_list, {
    //   through: "user_task_list",
    //   foreignKey: "task_id",
    //   otherKey: "task_list_id"
    // });
  };
  return task;
};
