"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_task_list = sequelize.define(
    "user_task_list",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      task_id: DataTypes.INTEGER,
      task_list_id: DataTypes.INTEGER,
      is_complete: DataTypes.BOOLEAN,
      completition_date: DataTypes.DATE,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER
    },
    {
      tableName: "user_task_lists",
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
  user_task_list.associate = function(models) {
    // associations can be defined here
    user_task_list.belongsTo(models.task_list, {
      foreignKey: "task_list_id"
    });
  };
  return user_task_list;
};
