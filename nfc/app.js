function log(str) {
	const p = document.createElement('p');
	p.textContent = str;
	document.querySelector('main').appendChild(p);
}

if(!navigator.nfc) {
	document.querySelector('.error').classList.remove('hidden');
} else {
	log('WebNFC supported. Start watching for tags.')
	navigator.nfc.watch((message) => {
		log(`Watch triggered. ${JSON.stringify(message)}`);
		console.log(message);
	}).then((data) => {
		log(`Added watch for tags. (${JSON.stringify(data)})`)
	}).catch((error) => {
		log(`Adding watch failed. Reason: ${error.toString()}`)
	});
}
