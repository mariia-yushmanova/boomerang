// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const db = require('./db/models');
const { Sequelize } = require('sequelize');

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
});

// Запуск игры.
game.play();

// async function connectCheck() {
//   try {
//     await db.sequelize.authenticate();
//     console.log('База успешно подключена!');
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// connectCheck();
