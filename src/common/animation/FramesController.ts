interface IFrameHandler {
    onFrame(): void;
}

const framesHandlers: Array<IFrameHandler> = [];

class FramesController {
    static addFrameHandler(handler: IFrameHandler) {
        framesHandlers.push(handler);
    }
    static removeFrameHandler(handler: IFrameHandler) {
        const handlerIndex = framesHandlers.indexOf(handler);
        framesHandlers.splice(handlerIndex, 1);
    }
}

const animationFrameCallback = () => {
    for (const handler of framesHandlers) {
        handler.onFrame();
    }
    requestAnimationFrame(animationFrameCallback);
};
requestAnimationFrame(animationFrameCallback);

export {IFrameHandler, FramesController};