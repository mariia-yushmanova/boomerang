// Сделаем отдельный класс для отображения игры в консоли.
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
    console.log('\n');
    console.log(track.join(' '));
    console.log('\n');
    if (hero.livesCount === 0) {
      console.log(`Твой результат: ${hero.score}`);
    }
    console.log('\n');
    console.log(`Created by ${yourTeamName} with love`);
  }
}
module.exports = View;
