// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const Boomerang = require("./game-models/Boomerang");
const View = require("./View");
const runInteractiveConsole = require("./keyboard");

const { Sequelize, sequelize, scores } = require("../db/models");
const db = require("../db/models");

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 1 }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.boomerang = new Boomerang();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
  }

  async name() {
    const res = await db.scores.findOrCreate({
      where: { name: `${process.argv[2]}` },
      defaults: { score: this.hero.score },
    });
    return res;
  }

  async update() {
    const result = await db.scores.update(
      { score: this.hero.score }, // attribute
      { where: { name: `${process.argv[2]}` } } // condition
    );
    return result;
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(" ");
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
  }

  async check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
      this.regenerateTrack();
      this.hero.position = 0;
      this.hero.livesCount -= 1;
      if (this.hero.livesCount === 2) {
        this.hero.health = "Жизни: 💜💜🖤";
        this.enemy.position = 29;
      }
      if (this.hero.livesCount === 1) {
        this.hero.health = "Жизни: 💜🖤🖤";
        this.enemy.position = 29;
      }
      if (this.hero.livesCount === 0) {
        this.hero.health = "Жизни: 🖤🖤🖤";
        this.enemy.position = 29;
        this.hero.skin = "💀";
        // setTimeout(() => {
        this.hero.die();
        await this.name();
        process.exit();
        // });
      }
    }

    if (this.boomerang.position >= this.enemy.position) {
      this.enemy.die();
      this.hero.score += 10;
      this.enemy = new Enemy();
      this.enemy.position = 29;
      this.enemy.moveLeft();
      this.boomerang.direction = "left";
    }

    if (this.boomerang.position <= this.hero.position) {
      this.boomerang.position = undefined;
      this.boomerang.direction = "right";
      // this.boomerang = new Boomerang();
    }
    if (
      this.boomerang.position !== this.hero.position &&
      this.boomerang.direction === "right"
    ) {
      this.boomerang.moveRight();
    }
    if (
      this.boomerang.position !== this.hero.position &&
      this.boomerang.direction === "left"
    ) {
      this.boomerang.moveLeft();
    }
  }

  play() {
    runInteractiveConsole(this.hero, this.boomerang);
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track, this.hero);
    }, 50);
    this.enemy.moveLeft();
  }
}

module.exports = Game;
