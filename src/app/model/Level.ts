import {verifyBoolean, verifyObject, verifyString} from "../../_common/utils/typetools";
import {ValidationError} from "../../_common/http/Exceptions";
import {Size} from "../../_common/utils/Size";

type LevelConfig = {
	id: string,
	title: string,
	task: string,
	help: string,
	img: string,
	enable: boolean,
	passed: boolean,
	canvasSize: Size,
	detailedAnswer?: string,
	userAnswer?: string,
}

class Level {
	constructor({id, task, help, passed, img, enable, title, detailedAnswer, userAnswer, canvasSize}: LevelConfig) {
		this.id = id;
		this.task = task;
		this.help = help;
		this.img = img;
		this.title = title;
		this.enable = enable;
		this.passed = passed;
		this.userAnswer = userAnswer;
		this.detailedAnswer = detailedAnswer;
		this.canvasSize = canvasSize;
		Object.freeze(this);
	}

	public serialize(): LevelConfig {
		return {
			id: this.id,
			img: this.img,
			task: this.task,
			help: this.task,
			title: this.title,
			enable: this.enable,
			passed: this.passed,
			userAnswer: this.userAnswer,
			detailedAnswer: this.detailedAnswer,
			canvasSize: this.canvasSize,
		}
	}

	public static load(levelConfig: any): Level {
		try {
			verifyObject(levelConfig);
			return new Level({
				id: verifyString(levelConfig.id),
				task: verifyString(levelConfig.task),
				help: verifyString(levelConfig.help),
				img: verifyString(levelConfig.img),
				title: verifyString(levelConfig.title),
				passed: verifyBoolean(levelConfig.passed),
				enable: verifyBoolean(levelConfig.enable),
				canvasSize: Size.load(levelConfig.canvasSize),
				detailedAnswer: levelConfig.detailedAnswer,
				userAnswer: levelConfig.userAnswer,
			});
		} catch (err) {
			throw new ValidationError(err, `Invalid level config`);
		}
	}

	public readonly passed: boolean;
	public readonly enable: boolean;
	public readonly img: string;
	public readonly help: string;
	public readonly title: string;
	public readonly id: string;
	public readonly task: string;
	public readonly detailedAnswer: string | null;
	public readonly userAnswer: string | null;
	public readonly canvasSize: Size;
}

export {Level, LevelConfig};