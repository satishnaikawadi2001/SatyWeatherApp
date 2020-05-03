const request = require('request');

const geoCode = (address, callback) => {
	const add = encodeURIComponent(address);
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=pk.eyJ1Ijoic2F0aXNobmFpa2F3YWRpIiwiYSI6ImNrOW1saDh5OTAweDkzc3BoemU4ZWhpODcifQ.jmeQQMS66x8yz3QGivSGCA&limit=1`;

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to geocoding service', undefined);
		}
		else if (response.body.message || response.body.features.length === 0) {
			callback('Unale to found location.Try another search.', undefined);
		}
		else {
			const loc = response.body.features[0].center;
			const lati = loc[1];
			const longi = loc[0];
			const locName = response.body.features[0].place_name;
			callback(
				undefined,
				// 'The longitude of given location is ' +
				// 	longi +
				// 	' . The latitude of given location is ' +
				// 	lati +
				// 	' . Your Location is ' +
				// 	locName +
				// 	'. '
				{
					lati    : loc[1],
					longi   : loc[0],
					locName : response.body.features[0].place_name
				}
			);
		}
	});
};

module.exports = geoCode;

// const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: body.features[0].center[1],
//                 longitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode
