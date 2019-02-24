import {Level} from "../model/Level";
import {ServerApiHelper} from "./ServerApiHelper";
import {Disposable} from "../../_common/disposable/Disposable";
import {IErrorHandler} from "./IErrorHandler";
import {LevelsList} from "../model/LevelsList";
import {ILevelsProvider} from "../model/ILevelsProvider";

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
            this._currentLevel = this._levels.iterator(id);
        }
    }

    public async setCurrentLevelAnswer(answer: string) {
        this._serverRequest = this._serverRequest
            .then(() => {
                const currentLevelId = this._currentLevel.value().id;
                this._levels.setAnswer(currentLevelId, answer);
                this._api.setLevelAnswer(currentLevelId, answer);
            })
            .then(() => this._updateLevels());
    }

    public async selectNextLevel() {
        this._currentLevel = this._currentLevel.next();
    }

    public async nextLevel(): Promise<Level|null> {
        await this._serverRequest;
        let prevLevel: Level|null = null;
        for (const level of this._levels) {
            if (prevLevel && prevLevel.id == this._currentLevel.value().id) {
                return level;
            }
            prevLevel = level;
        }
        return null;
    }

    public async getLevels(): Promise<ILevelsProvider> {
        await this._serverRequest;
        return this._levels;
    }

    public async isLevelPassed(id: string): Promise<boolean> {
        await this._serverRequest;
        return this._levels.get(id).passed;
    }

    public async isLevelEnabled(id: string): Promise<boolean> {
        await this._serverRequest;
        return this._levels.get(id).enable;
    }

    public async currentLevel(): Promise<Level> {
        await this._serverRequest;
        return this._currentLevel.value();
    }

    private _updateLevels(): Promise<void> {
        return this._api
            .getLevels()
            .then((levels: Array<Level>) => this._levels.add(...levels))
            .catch((err) =>this._errorsHandler.handleError(err));
    }

    private _api: ServerApiHelper;
    private _levels = new LevelsList([]);
    private _currentLevel = this._levels.iterator();
    private _serverRequest: Promise<void>;
    private _errorsHandler: IErrorHandler;
}

export {GameContext};