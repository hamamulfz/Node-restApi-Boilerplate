'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
return queryInterface.bulkInsert("Todos", [
  {
    name: "Learn Node API",
    description: "form hamamulfz medium",
    created_at: Math.floor(Date.now() / 1000),
    updated_at: Math.floor(Date.now() / 1000)
  }
]);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete(
     "Todos",
     null,
     {}
   );
  }
};
