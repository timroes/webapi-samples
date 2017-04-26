let device;

const red = document.getElementById('red');
const green = document.getElementById('green');
const blue = document.getElementById('blue');

document.querySelector('button').addEventListener('click', () => {
	navigator.usb.requestDevice({
		filters: [
			{ vendorId: 0x2341 }
		]
	}).then(dev => {
		dev.open().then(() => {
			document.querySelector('.devinfo').textContent = `${dev.productName} (${dev.vendorId.toString(16)}:${dev.productId.toString(16)})`;
			return dev.selectConfiguration(1);
		}).then(() => {
			return dev.claimInterface(2);
		}).then(() => {
			return dev.controlTransferOut({
				requestType: 'class',
				recipient: 'interface',
				request: 0x22,
				value: 0x01,
				index: 0x02
			})
		}).then(() => {
			device = dev;
		});
	});
});

ColorPicker(
	document.getElementById('slider'),
	document.getElementById('picker'),
	function(hex, hsv, rgb) {
		if (!device) return;
		device.transferOut(4, new Uint8Array([rgb.r, rgb.g, rgb.b]));
		document.querySelector('.color').textContent = hex;
	}
);
