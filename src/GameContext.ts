import {Level} from "./model/Level";
import {ServerApiHelper} from "./ServerApiHelper";
import {BaseCustomError} from "./common/http/Exceptions";
import {Disposable} from "./common/disposable/Disposable";
import {ServerErrorsHandler} from "./ServerErrorsHandler";

class GameContext extends Disposable {
    constructor(api: ServerApiHelper, errorHandler: ServerErrorsHandler) {
        super();
        this._api = api;
        this._errorsHandler = errorHandler;
        this._serverRequestPromise = this._updateLevels();
    }

    public async setCurrentLevel(id: string) {
        await this._serverRequestPromise;
        if (this._levels.has(id)) {
            this._currentLevel = this._levels.get(id);
        }
    }

    public async setCurrentLevelAnswer(answer: string) {
        this._serverRequestPromise.then(() => this._api.setLevelAnswer(this._currentLevel.id(), answer));
        this._serverRequestPromise.then(() => this._updateLevels());
    }

    public async selectNextLevel() {
        await this._serverRequestPromise;
        this._currentLevel = (await this.nextLevel()) || this._currentLevel;
    }

    public async nextLevel(): Promise<Level|null> {
        await this._serverRequestPromise;
        let prevLevel: Level|null = null;
        for (const level of this._levels.values()) {
            if (prevLevel && prevLevel.id() == this._currentLevel.id()) {
                return level;
            }
            prevLevel = level;
        }
        return null;
    }

    public async getLevels(): Promise<Array<Level>> {
        await this._serverRequestPromise;
        return Array(...this._levels.values());
    }

    public async isLevelEnabled(id: string): Promise<boolean> {
        await this._serverRequestPromise;
        return this._levels.get(id).enable();
    }

    public async currentLevel(): Promise<Level> {
        await this._serverRequestPromise;
        return this._currentLevel;
    }

    private _updateLevels(): Promise<void> {
        return this._api.getLevels().then((levels: Array<Level>) => {
            for (const level of levels) {
                this._levels.set(level.id(), level);
            }
            if (!this._currentLevel) {
                this._currentLevel = Array(...this._levels.values())[0];
            }
            else {
                this._currentLevel = this._levels.get(this._currentLevel.id());
            }
        }).catch(this._errorHandler.bind(this));
    }

    private _errorHandler(error: BaseCustomError): Promise<void> {
        this._errorsHandler.handleError(error);
        if (error.code < 400) {
            return this._updateLevels();
        }
        return Promise.resolve();
    }

    private _api: ServerApiHelper;
    private _errorsHandler: ServerErrorsHandler;
    private _levels: Map<string, Level> = new Map();
    private _currentLevel?: Level;
    private _serverRequestPromise: Promise<void>;
}

export {GameContext};