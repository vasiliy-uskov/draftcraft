import {Level} from "./model/Level";
import {ServerApiHelper} from "./ServerApiHelper";

class GameContext {
    constructor(api: ServerApiHelper) {
        this._api = api;
        this._serverRequestPromise = this._updateLevels();
    }

    public setCurrentLevel(id: string): Promise<void> {
        return this._synchronizeAction(() => {
            if (this._levels.has(id)) {
                this._currentLevel = this._levels.get(id);
            }
        });
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
            let prevLevel: Level|null = null;
            for (const level of this._levels.values()) {
                if (prevLevel.id() == this._currentLevel.id()) {
                    this._currentLevel = level;
                    return;
                }
                prevLevel = level;
            }
        });
    }

    public lastLevelSelected(): Promise<boolean> {
        return this._synchronizeAction(() => {
            return Array(...this._levels.values()).reverse()[0] == this._currentLevel;
        });
    }

    public getLevels(): Promise<Array<Level>> {
        return this._synchronizeAction(() => Array(this._levels.values()).map((itr) => itr.return().value));
    }

    public isLevelEnabled(id: string): Promise<boolean> {
        return this._synchronizeAction(() => this._levels.get(id).enable());
    }

    public currentLevel(): Promise<Level> {
        return this._synchronizeAction(() => this._currentLevel);
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
                this._currentLevel = this._levels.values().return().value;
            }
        }).catch(() => {
            return Promise.resolve();
        });
    }

    private _api: ServerApiHelper;
    private _levels: Map<string, Level> = new Map();
    private _currentLevel?: Level;
    private _serverRequestPromise: Promise<void>;
}

export {GameContext};