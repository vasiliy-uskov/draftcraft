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

function promisify<T>(fn: (fn: () => void, ...other: any) => T, ...other: any) {
    return new Promise((resolve: () => void) => {
        fn(resolve, other);
    });
}

export {eventToPromise, promisify};