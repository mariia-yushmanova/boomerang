// Наш герой.

class Hero {
  constructor({ position, boomerang }) {
    this.skin = '🦉'; // можете использовать любые emoji '💃'
    this.position = position;
    this.boomerang = boomerang;
    this.health = 'Твои жизни: 💙💙💙';
    this.livesCount = 3;
    this.score = 0;
    this.record = 0;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
    if (this.position <= 2) {
      this.position = 1;
    }
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.fly();
  }

  die() {
    if (this.health === 0) {
      this.skin = '💀';
    }
    // process.exit();
  }
}

module.exports = Hero;
