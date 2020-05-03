const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=e8f5c241b97ab8a23619f63b03c91473&query=${latitude},${longitude}`;
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		}
		else if (response.body.error) {
			callback('Unable to get your location', undefined);
		}
		else {
			callback(
				undefined,
				response.body.current.weather_descriptions[0] +
					' . It is currently ' +
					response.body.current.temperature +
					' degree outside. It fells like ' +
					response.body.current.feelslike +
					' degree .'
			);
		}
	});
};

module.exports = forecast;
