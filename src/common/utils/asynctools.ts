import {EventDispatcher} from "../disposable/EventDispatcher";

function eventToPromise<T>(eventDispatcher: EventDispatcher<T>) {
    return new Promise((resolve: (data: T) => void) => {
        const handler = (data: T) => {
            eventDispatcher.removeHandler(handler);
            resolve(data);
        };
        eventDispatcher.addHandler(handler);
    });
}

export {eventToPromise};