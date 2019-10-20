import {Level, LevelConfig} from "../model/Level";
import {AjaxHelper} from "../../_common/http/AjaxHelper";
import {ApiUrls} from "../ApiUrls";

class ServerApiHelper {
	constructor(sessionId: string) {
		this._sessionId = sessionId;
	}

	public getLevels(): Promise<Level[]> {
		return AjaxHelper.post(ApiUrls.getLevels, this._getData()).then((data: Object) => {
			const levels: Level[] = [];
			let dataJSON = data as Array<LevelConfig>;
			for (const levelJson of dataJSON) {
				levels.push(Level.load(levelJson));
			}
			return levels;
		})
	}

	public setLevelAnswer(taskId: string, answer: string): Promise<void> {
		return AjaxHelper.post(ApiUrls.addAnswer, this._getData({taskId, answer})).then(() => {
		});
	}

	private _getData(args?: Object): Object {
		const data = {sessionId: this._sessionId};
		return args ? Object.assign(data, args) : data;
	}

	_sessionId: string;
}

export {ServerApiHelper};