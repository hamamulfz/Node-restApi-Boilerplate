"use strict";
module.exports = (sequelize, DataTypes) => {
  const task_list = sequelize.define(
    "task_list",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      task_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      tableName: "task_lists",

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
  task_list.associate = function(models) {
    // associations can be defined here
    task_list.belongsTo(models.task, {
      foreignKey: "task_id"
    });
    // task_list.belongsToMany(models.task, {
    //   through: "user_task_list",
    //   foreignKey: "task_list_id",
    //   otherKey: "task_id"
    // });
    task_list.hasMany(models.user_task_list, {
      foreignKey: "task_list_id"
    });
  };
  return task_list;
};
