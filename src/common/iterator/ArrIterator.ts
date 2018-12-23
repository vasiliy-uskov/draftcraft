import {clamp} from "../utils/mathutils";

class ArrIterator<T> {
    constructor(index: number, changes: Array<T>) {
        this._index = index;
        this._entities = changes;
        this._validateIndex();
    }

    public next(): ArrIterator<T> {
        this._index = ++this._index;
        this._validateIndex();
        return this;
    }

    public prev(): ArrIterator<T> {
        this._index--;
        this._validateIndex();
        return this;
    }

    public insert(change: T): ArrIterator<T> {
        this._entities.splice(this._index, 0, change);
        return this;
    }

    public deleteTail(): ArrIterator<T> {
        this._entities.splice(this._index, this._entities.length);
        return this;
    }

    public value(): T|null {
        return this._entities[this._index];
    }

    public clone(): ArrIterator<T> {
        return new ArrIterator<T>(this._index, this._entities);
    }

    public equal(it: ArrIterator<T>): boolean {
        return it._index == this._index && it._entities.every(
            (change: T, index: number) => this._entities[index] == it._entities[index]
        );
    }

    private _validateIndex(): void {
        this._index = clamp(this._index, 0, this._entities.length);
    }

    private _index: number = 0;
    private readonly _entities: Array<T> = [];
}

function iterate<T>(from: ArrIterator<T>, to: ArrIterator<T>, fn: (change: T) => void) {
    const it = from;
    while (!it.equal(to)) {
        fn(it.value());
    }
}

export {ArrIterator, iterate};