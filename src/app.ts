import "@babel/polyfill";
import {GameContext} from "./GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";
import {ServerApiHelper} from "./ServerApiHelper";
import {ServerErrorsHandler} from "./ServerErrorsHandler";

const sessionId = sessionStorage.getItem("draftCraftSessionId");
const messages = new Messages();
const gameContext = new GameContext(
    new ServerApiHelper(sessionId),
    new ServerErrorsHandler(messages)
);
const game = new Game(gameContext, messages);
game.start();