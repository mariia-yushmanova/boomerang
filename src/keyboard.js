// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!
const keypress = require('keypress');
const Boomerang = require('./game-models/Boomerang');
const Hero = require('./game-models/Hero');
const sound = require('play-sound')((opts = {}));

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.
// Какая-то функция.
function runInteractiveConsole(Hero, Boomerang) {
  const keyboard = {
    a: () => Hero.moveLeft(),
    d: () => Hero.moveRight(),
    e: () => {
      Boomerang.position = Hero.position + 1;
      sound.play(
        '/Users/mariia/Desktop/phase-1/week3/core-async-boomerang/src/sounds/just-like-magic.wav'
      );
    },
  };
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}
// Давай попробуем запустить этот скрипт!
// runInteractiveConsole();
module.exports = runInteractiveConsole;
