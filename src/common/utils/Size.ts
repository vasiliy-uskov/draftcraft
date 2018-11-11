class Size {
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public equal(size: Size) {
        return this.width == size.width && this.height == size.height;
    }

    public clone(): Size {
        return new Size(this.width, this.height);
    }

    public toString(): string {
        return JSON.stringify({
            width: this.width,
            height: this.height
        })
    }

    public width: number;
    public height: number;
}

export {Size}