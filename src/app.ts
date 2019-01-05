import "@babel/polyfill";
import {GameContext} from "./GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";
import {ServerApiHelper} from "./ServerApiHelper";

const sessionId = Math.random().toString(16);
document.cookie = `sessionId=${sessionId}`; //TODO:: Fix it when integrate with mooped
const gameContext = new GameContext(new ServerApiHelper(sessionId));
const messages = new Messages();
const game = new Game(gameContext, messages);
game.start();