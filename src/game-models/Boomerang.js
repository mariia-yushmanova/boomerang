// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
const Hero = require('./Hero');

class Boomerang {
  constructor() {
    this.skin = '🔱';
    this.position = undefined;
    this.direction = 'right';
  }

  fly() {
    this.position = Hero.position + 1;
    this.moveRight();
    this.moveLeft();
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
