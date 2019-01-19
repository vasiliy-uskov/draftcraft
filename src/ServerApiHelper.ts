import {Level, LevelConfig} from "./model/Level";
import {AjaxHelper} from "./common/http/AjaxHelper";
import {ApiUrls} from "./ApiUrls";
import {IncorrectRequestParams} from "./common/exceptions/Exceptions";

type SetAnswerJson = {
    sessionId: string,
    taskId: string,
    answer: string, //stringified JSON
}

enum SetAnswerStatus {
    ok = 200,
}

class ServerApiHelper {
    constructor(sessionId: string) {
        this._sessionId = sessionId;
    }
    public getLevels(): Promise<Level[]> {
        return AjaxHelper.post(ApiUrls.getLevels, this._getData()).then((data: Object) => {
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

    public setLevelAnswer(taskId: string, answer: string): Promise<void> {
        const data = this._getData({taskId, answer}) as SetAnswerJson;
        return AjaxHelper.post(ApiUrls.addAnswer, data).then(({status}: {status: number}) => {
            if (status != SetAnswerStatus.ok) {
                const error = new IncorrectRequestParams();
                console.error(error);
                throw error;
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