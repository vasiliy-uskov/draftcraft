import {GameContext} from "./model/GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";
import {Level} from "./model/Level";

const gameContext = new GameContext([
    new Level("Task", "Level", "", 600),
    new Level("Task", "Level", "", 700),
    new Level("Task", "Level", "", 1000),
    new Level("Task", "Level", "", 700),
    new Level("Task", "Level", "", 120),
    new Level("Task", "Level", ""),
    new Level("Task", "Level", ""),
]);
const messages = new Messages();
const game = new Game(gameContext, messages);
game.start();