class Iterator<T> {
	constructor(values: Iterable<T>, currentElement?: T) {
		this._values = new Array<T>(...values);
		this._pointer = Math.max(0, this._values.indexOf(currentElement));
	}

	public next(): IteratorResult<T> {
		if (this._pointer < this._values.length) {
			return {
				done: false,
				value: this._values[this._pointer++]
			}
		}
		else {
			return {
				done: true,
				value: null
			}
		}
	}

	private readonly _values: Array<T>;
	private _pointer = 0;
}

export {Iterator}