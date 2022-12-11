// Сделаем отдельный класс для отображения игры в консоли.
const c = require('ansi-colors');
class View {
  render(track, hero) {
    const yourTeamName = 'Owls';
    // Тут всё рисуем.
    console.clear();
    console.log(hero.health);
    console.log(`Твой счет : ${hero.score}`);
    if (process.argv[2]) {
      console.log(`Имя игрока: ${process.argv[2]}`);
    }
    console.log(
      c.bold.green('                         Owls 2022                       ')
    );
    console.log('🔥'.repeat(track.length));
    console.log('\n');
    console.log(track.join(' '));
    console.log('\n');
    console.log('🔥'.repeat(track.length));

    if (hero.livesCount === 0) {
      console.clear();
      console.log(c.bold.red(`Твой результат: ${hero.score}`));
    }
    console.log('\n');
    console.log(c.bold.yellow(`Created by ${yourTeamName} with love`));
  }
}
module.exports = View;
