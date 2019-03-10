import {isFunction} from "../utils/typetools";

interface IFrameHandler {
	onFrame(): void;
}

const framesHandlers: Set<IFrameHandler | (() => void)> = new Set();

class FramesController {
	static addFrameHandler(handler: IFrameHandler | (() => void)) {
		framesHandlers.add(handler);
	}

	static removeFrameHandler(handler: IFrameHandler | (() => void)) {
		framesHandlers.delete(handler);
	}
}

const animationFrameCallback = () => {
	for (let handler of framesHandlers.values()) {
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