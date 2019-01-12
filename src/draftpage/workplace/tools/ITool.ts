interface ITool {
    activate(): void;
    deactivate(): void;
    reset(): void;
    icon(): string;
}

export {ITool}