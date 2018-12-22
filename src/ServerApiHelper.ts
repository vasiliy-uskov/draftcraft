import {Level, LevelConfig} from "./model/Level";
import {AjaxHelper} from "./common/http/AjaxHelper";

type SetAnswerJson = {
    sessionId: string,
    levelId: string,
    answer: string, //JSON
}

enum SetAnswerStatus {
    ok = 200,
    error = 400,
}

class ServerApiHelper {
    constructor(sessionId: string) {
        this._sessionId = sessionId;
    }
    public getLevels(): Promise<Level[]> {
        return AjaxHelper.post(ApiRouting.getLevels, this._getData()).then((data: Object) => {
            const levels: Level[] = [];
            let dataJSON = data as Array<LevelConfig>;
            for (const levelJson of dataJSON) {
                Level.validateConfig(levelJson);
                levels.push(new Level(levelJson));
            }
            return levels;
        }).catch((err) => {
            console.error(err);
            throw err;
        })
    }

    public setLevelAnswer(levelId: string, answer: string): Promise<void> {
        const data = this._getData({levelId, answer}) as SetAnswerJson;
        return AjaxHelper.post(ApiRouting.addAnswer, data).then(({status}: {status: number}) => {
            if (status != SetAnswerStatus.ok) {
                throw new Error("Bad level answer")
            }
        });
    }

    private _getData(args?: Object): Object {
        const data = {sessionId: this._sessionId};
        return args ? Object.assign(data, args) : data;
    }

    _sessionId: string;
}

export {ServerApiHelper};