if (!navigator.bluetooth) {
	document.querySelector('.heartrate').textContent = '💔';
	document.body.classList.add('error');
	console.error("Web Bluetooth support is required for this demo.");
} else {
	document.querySelector('.heartrate').addEventListener('click', () => {
		if (navigator.bluetooth !== undefined) {
			navigator.bluetooth.requestDevice({
				filters: [
					{
						name: 'CUBOT V2'
						// namePrefix: 'CUBOT'
						// services: ['battery_service']
					}
				],
				optionalServices: [
					'0000fff0-0000-1000-8000-00805f9b34fb'
					// All services that you want to access needs to be either listed
					// in services in the filter or in optionalServices here
				]
			}).then(dev => {
				// The user selected a device, now connect to its GATT server
				return dev.gatt.connect();
			}).then(server => {
				// Connection was successfull now we can get any of the services of the device
				// This could also be a name like 'heart_rate' or 'battery_service'
				return server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
			}).then(service => {
				// Get a characteristic of this service. Could also be some of the
				// well known BLE characteristics like 'heart_rate_measurement'
				return service.getCharacteristic('0000fff7-0000-1000-8000-00805f9b34fb');
			}).then(chara => {
				// If the characteristic supports notification (this does) we can now
				// start listening for notifications.
				return chara.startNotifications();
			}).then(chara => {
				// If we started listening for notifications successfully register
				// a 'characteristicvaluechanged' listener which will be triggered
				// on new values.
				document.querySelector('.heartrate .icon').classList.add('animate');
				chara.addEventListener('characteristicvaluechanged', (event) => {
					// Extract the value from the event
					const value = event.target.value;
					const heartbeat = value.getUint8(1);

					const frequency = 60 / heartbeat;
					document.querySelector('.heartrate .value').textContent = heartbeat;
					document.querySelector('.heartrate .icon').style.animationDuration = `${frequency}s`;
				});
			});
		}
	});
}
