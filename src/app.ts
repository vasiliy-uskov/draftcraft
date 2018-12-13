import {polyfills} from "./common/utils/polyfill"; polyfills();
import {GameContext} from "./model/GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";
import {Level} from "./model/Level";


const gameContext = new GameContext([
    new Level(
        `<b>Упражнение 1:</b> Построить чертёж точки по координатам С(15; 20; 30) M(20; 0; 25) F(35; 10; 15) D(0; 30; 10)`,
        `<h2>Проекция точек на плоскость</h2>`, "./build/task1.png"),
    new Level(
        `<b>Упражнение 2:</b> Построить чертёж точки по координатам E(10; 15; 30) M(30; 25; 0) F(0; 20; 15) D(0; 10; 0)`,
        `<h2>Проекция точек на плоскость</h2>\n`, "./build/task1.png"),
    new Level(
        `<b>Упражнение 3:</b> Построить проекции недостающих точек, если известно, что они принадлежат горизонтальной 
плоскости уровня, отстоящей от плоскости П<sub>1</sub> на 15`,
        `<h2>Проекция точек на плоскость</h2>\n`, "./build/task2.png"),
    new Level(
        `<b>Упражнение 4:</b> Построить недостающие проекции точек, принадлежащих поверхности пирамиды`,
        `<h2>Проекция точек на плоскость</h2>\n`, "./build/task3.png"),
    new Level(
        `<b>Упражнение 5:</b> Построить недостающие проекции точек, принадлежащих поверхности призмы`,
        `<h2>Проекция точек на плоскость</h2>\n`, "./build/task4.png"),
    new Level(
        `<b>Упражнение 6:</b> построить недостающую проекцию линии сечения многогранника плоскостью`,
        `<h2>Проекция точек на плоскость</h2>\n`, "./build/task5.png"),
    new Level(
        `<b>Упражнение 7:</b> построить недостающую проекцию выреза`,
        `<h2>Проекция точек на плоскость</h2>\n`, "./build/task6.png"),
    new Level("Task", "Level", ""),
    new Level("Task", "Level", ""),
    new Level("Task", "Level", ""),
]);
const messages = new Messages();
const game = new Game(gameContext, messages);
game.start();