import {Level} from "./Level";
import {Iterator} from "../../_common/iterator/Iterator";
import {ILevelsProvider} from "./ILevelsProvider";
import {LevelsIterator} from "./LevelsIterator";

class LevelsList implements ILevelsProvider {
	constructor(levels: Array<Level>) {
		this._levels = levels;
	}

	public add(...levels: Array<Level>) {
		const userAnswersMap = new Map<string, string>();
		[...this._levels, ...levels].forEach(
			level => level.userAnswer && userAnswersMap.set(level.id, level.userAnswer)
		);
		this.remove(...levels);
		this._levels.push(...levels);
		for (const [id, answer] of userAnswersMap) {
			this.setAnswer(id, answer)
		}
	}

	public remove(...levels: Array<Level>) {
		this._levels = this._levels.filter(level =>
			!levels.find(removingLevel => removingLevel.id == level.id)
		)
	}

	public has(id: string): boolean {
		return !!this.get(id);
	}

	public get(id: string): Level | null {
		return this._levels.find(level => level.id == id)
	}

	public setAnswer(id: string, answer: string) {
		const level = this.get(id);
		if (level) {
			this._levels[this._levels.indexOf(level)] = new Level({
				...level.serialize(),
				userAnswer: answer,
			})
		}
	}

	public iterator(startId?: string): LevelsIterator {
		return new LevelsIterator(this, startId);
	}

	[Symbol.iterator](): Iterator<Level> {
		return new Iterator(this._levels);
	}

	private _levels: Array<Level>;
}

export {
	LevelsList,
};