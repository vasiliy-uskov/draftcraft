import {GameContext} from "./GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";
import {ServerApiHelper} from "./ServerApiHelper";

const sessionId = sessionStorage.getItem("draftCraftSessionId");
const gameContext = new GameContext(new ServerApiHelper(sessionId));
const messages = new Messages();
const game = new Game(gameContext, messages);
game.start();