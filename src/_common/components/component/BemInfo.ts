import {isBool} from "../../utils/typetools";

class BemInfo {
	constructor(blockName: string, elementName?: string) {
		this._blockName = blockName;
		this._elementName = elementName;
	}

	public updateModifier(modifier: string, value: string | boolean | number) {
		this._modifiers.set(modifier, value);
	}

	public getClassName(): string {
		let className = this._getClassNameWithoutModifiers();
		for (const modifier of this._modifiers.keys()) {
			if (this._getModifier(modifier)) {
				className += " " + this._getClassNameWithoutModifiers() + this._getModifier(modifier);
			}
		}
		return className;
	}

	public blockName(): string {
		return this._blockName;
	}

	private _getClassNameWithoutModifiers(): string {
		return this._elementName ? `${this._blockName}__${this._elementName}` : this._blockName;
	}

	private _getModifier(modifier: string): null | string {
		if (!this._modifiers.has(modifier)) {
			return null;
		}
		const modifierValue = this._modifiers.get(modifier);
		if (isBool(modifierValue)) {
			return modifierValue ? `_${modifier}` : "";
		}
		return `_${modifier}_${modifierValue}`;
	}

	private _blockName: string;
	private _elementName: string | void;
	private _modifiers: Map<string, string | boolean | number> = new Map();
}

export {BemInfo};