"use strict";
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define(
    "todo",
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
      tableName: "todos",

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
  return todo;
};
