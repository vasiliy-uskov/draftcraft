import {isFunction} from "../utils/typetools";

interface IFrameHandler {
    onFrame(): void;
}

const framesHandlers: Array<IFrameHandler|(() => void)> = [];

class FramesController {
    static addFrameHandler(handler: IFrameHandler|(() => void)) {
        framesHandlers.push(handler);
    }
    static removeFrameHandler(handler: IFrameHandler|(() => void)) {
        const handlerIndex = framesHandlers.indexOf(handler);
        framesHandlers.splice(handlerIndex, 1);
    }
}

const animationFrameCallback = () => {
    for (let handler of framesHandlers) {
        if (isFunction(handler)) {
            handler = handler as (() => void);
            handler();
        }
        else {
            handler = handler as IFrameHandler;
            handler.onFrame();
        }
    }
    requestAnimationFrame(animationFrameCallback);
};
requestAnimationFrame(animationFrameCallback);

export {IFrameHandler, FramesController};