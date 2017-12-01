// Create a new ResizeObserver with a callback
const observer = new ResizeObserver(entries => {
	// A list of all resized events
	for (let entry of entries) {
		// Each event has a reference to the changed element and the new content rect
		const { target, contentRect } = entry;
		const width = Math.round(contentRect.width);
		const height = Math.round(contentRect.height);
		target.textContent = `${width}x${height}`;
	}
});

// Register elements for this observer
observer.observe(document.getElementById('left-panel'));
observer.observe(document.getElementById('right-panel'));


// Randomly rescale the panels
setInterval(() => {
	const containerWidth = document.body.clientWidth;
	const minWidth = 200;
	const maxWidth = containerWidth - minWidth;
	const newWidth = Math.random() * (maxWidth - minWidth) + minWidth;
	document.getElementById('left-panel').style.minWidth = `${newWidth}px`;
}, 2000);
