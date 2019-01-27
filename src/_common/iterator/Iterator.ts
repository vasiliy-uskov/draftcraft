class Iterator<T> {
    constructor(values: Iterable<T>) {
        this._values = new Array<T>(...values);
    }

    next(): IteratorResult<T> {
        if (this._pointer < this._values.length) {
            return {
                done: false,
                value: this._values[this._pointer++]
            }
        } else {
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