import {Level} from "./Level";
import {ServerApiHelper} from "./ServerApiHelper";
import {Disposable} from "../../_common/disposable/Disposable";
import {IErrorHandler} from "./IErrorHandler";

class GameContext extends Disposable {
    constructor(api: ServerApiHelper, errorHandler: IErrorHandler) {
        super();
        this._api = api;
        this._errorsHandler = errorHandler;
        this._serverRequest = this._updateLevels();
    }

    public ready(): Promise<void> {
        return this._serverRequest;
    }

    public async setCurrentLevel(id: string) {
        await this._serverRequest;
        if (this._levels.has(id)) {
            this._currentLevel = this._levels.get(id);
        }
    }

    public async setCurrentLevelAnswer(answer: string) {
        this._serverRequest = this._serverRequest
            .then(() => this._api.setLevelAnswer(this._currentLevel.id(), answer))
            .then(() => this._updateLevels());
    }

    public async selectNextLevel() {
        this._currentLevel = (await this.nextLevel()) || this._currentLevel;
    }

    public async nextLevel(): Promise<Level|null> {
        await this._serverRequest;
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
        await this._serverRequest;
        return Array(...this._levels.values());
    }

    public async isLevelEnabled(id: string): Promise<boolean> {
        await this._serverRequest;
        return this._levels.get(id).enable();
    }

    public async currentLevel(): Promise<Level> {
        await this._serverRequest;
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
        }).catch((err) => this._errorsHandler.handleError(err));
    }

    private _api: ServerApiHelper;
    private _levels: Map<string, Level> = new Map();
    private _currentLevel?: Level;
    private _serverRequest: Promise<void>;
    private _errorsHandler: IErrorHandler;
}

export {GameContext};