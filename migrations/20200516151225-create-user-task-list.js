"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_task_lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.INTEGER
      },
      task_list_id: {
        type: Sequelize.INTEGER
      },
      is_complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      completition_date: {
        type: Sequelize.DATE,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        allowNull: true
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user_task_lists");
  }
};
