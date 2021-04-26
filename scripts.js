const http = require('http');
const fs = require('fs');


let countriesData = {};

const result = new Promise((resolve, reject) => {

	http.get('http://restcountries.eu/rest/v2/region/europe?fields=name;capital', (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			console.log(JSON.parse(data));
			countriesData = JSON.parse(data);
			resolve();

		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);
		reject(error)
	});

});

Promise.all([result])
	.then(() => {
		data = countriesData;
		fs.writeFile('united.json', JSON.stringify(data, null, '\t', ), err => {
			if (err) {
				console.error(err)
				return
			} else {
				console.log('Created: united.json');
			}
		})
	});
