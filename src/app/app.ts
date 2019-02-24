import "@babel/polyfill";
import {GameContext} from "./gamecontext/GameContext";
import {Game} from "./Game";
import {Messages} from "../_common/lng/Messages";
import {ServerApiHelper} from "./gamecontext/ServerApiHelper";
import {ErrorsHandlersQueue} from "./ErrorsHandlersQueue";

const sessionId = sessionStorage.getItem("draftCraftSessionId");
const messages = new Messages();
const errorsHandlersQueue = new ErrorsHandlersQueue();
const gameContext = new GameContext(
    new ServerApiHelper(sessionId),
    errorsHandlersQueue,
);
const game = new Game(gameContext, messages, errorsHandlersQueue);
gameContext.ready().then(() => game.start());