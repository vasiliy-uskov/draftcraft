import {GameContext} from "./model/GameContext";
import {Game} from "./Game";

const gameContext = new GameContext([]);
const game = new Game(gameContext);
game.start();