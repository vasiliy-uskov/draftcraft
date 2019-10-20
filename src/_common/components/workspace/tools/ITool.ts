interface ITool {
	activate(): void;

	deactivate(): void;

	reset(): void;
}

export {ITool}