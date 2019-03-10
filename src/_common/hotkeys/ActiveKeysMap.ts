let _activeKeys = new Set<string>();
window.addEventListener("keydown", (event) => {
	_activeKeys.add(event.code);
});
window.addEventListener("keyup", (event) => {
	_activeKeys.add(event.code);
});

export const isKeyPressed = _activeKeys.has.bind(_activeKeys);