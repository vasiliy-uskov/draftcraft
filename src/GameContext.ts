import {Level} from "./model/Level";
import {ServerApiHelper} from "./ServerApiHelper";

class GameContext {
    constructor(api: ServerApiHelper) {
        this._api = api;
        this._serverRequestPromise = this._updateLevels();
    }

    public setCurrentLevel(id: string) {
        const iterator = this._levels.values();
        while (!iterator.return().done && iterator.return().value.id() != id) {
            iterator.next();
        }
        if (!iterator.return().done) {
            this._currentLevel = iterator;
        }
    }

    public setCurrentLevelAnswer(answer: string) {
        this._serverRequestPromise = this.currentLevel().then((level) => {
            return this._api.setLevelAnswer(level.id(), answer)
                .then(() => this._updateLevels())
                .catch(() => Promise.resolve());
        })
    }

    public selectNextLevel(): Promise<void> {
        return this._synchronizeAction(() => {
            this._currentLevel.next()
        });
    }

    public lastLevelSelected(): Promise<boolean> {
        return this._synchronizeAction(() => this._currentLevel.return().done);
    }

    public getLevels(): Promise<Array<Level>> {
        return this._synchronizeAction(() => Array(this._levels.values()).map((itr) => itr.return().value));
    }

    public isLevelEnabled(id: string): Promise<boolean> {
        return this._synchronizeAction(() => this._levels.get(id).enable());
    }

    public currentLevel(): Promise<Level> {
        return this._synchronizeAction(() => this._currentLevel.return().value);
    }

    private _synchronizeAction<T>(action: () => T): Promise<T> {
        return this._serverRequestPromise.then(action);
    }

    private _updateLevels(): Promise<void> {
        return this._api.getLevels().then((levels: Array<Level>) => {
            for (const level of levels) {
                this._levels.set(level.id(), level);
            }
            if (!this._currentLevel) {
                this._currentLevel = this._levels.values();
            }
        }).catch(() => {
            return this._updateLevels();
        });
    }

    private _api: ServerApiHelper;
    private _levels: Map<string, Level> = new Map();
    private _currentLevel: IterableIterator<Level>;
    private _serverRequestPromise: Promise<void>;
}

export {GameContext};