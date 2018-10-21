import {GameContext} from "./model/GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";

const gameContext = new GameContext([]);
const messages = new Messages();
const game = new Game(gameContext, messages);
game.start();