document.querySelector('button').addEventListener('click', () => {
	const methodData = [
		{
			supportedMethods: [ 'basic-card' ],
			data: {
				supportedNetworks: [ 'visa', 'mastercard' ]
			}
		},
		{
			supportedMethods: ['visa', 'mastercard']
		}
	];

	const details = {
		displayItems: [
			{
				label: 'Fabulous unicorn',
				amount: { currency: 'EUR', value: '13.00' }
			},
			{
				label: 'Replacement horn',
				amount: { currency: 'EUR', value: '0.37' }
			}
		],
		total: {
			label: 'Total',
			amount: { currency: 'EUR', value: '13.37' }
		}
	};

	const request = new PaymentRequest(methodData, details);

	request.show()
		.then((response) => {
			console.log("Payment request was successfull", response.details);
			// Send the recevied data from response.details to your payment service
			// This API doesn't take care of actual executing the payment, it just
			// collects data for you.
			setTimeout(() => {
				document.querySelector('.details').innerHTML = JSON.stringify(response.details, null, 2);
				response.complete('success');
			}, 2000);
		})
		.catch((reason) => {
			console.error("Payment request failed", reason);
		});
});
