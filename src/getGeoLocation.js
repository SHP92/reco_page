import $ from 'jquery';

const getGeoLocation = () => {
	let location = ""
	if ("geolocation" in navigator) {
		// check if geolocation is supported/enabled on current browser
		navigator.geolocation.getCurrentPosition(
			async function success(position) {
				// for when getting location is a success
				console.log(
					"latitude",
					position.coords.latitude,
					"longitude",
					position.coords.longitude
				)
				location = await getAddress(position.coords.latitude, position.coords.longitude)
				console.log(location.results[7].address_components[0].short_name)
			},
			function error(error_message) {
				// for when getting location results in an error
				console.error(
					"An error has occured while retrievinglocation",
					error_message
				)
				ipLookUp()
			}
		)
	} else {
		// geolocation is not supported
		// get your location some other way
		console.log("geolocation is not enabled on this browser")
		ipLookUp()
	}
	console.log("location : " + location)
	return location
}

const ipLookUp = () => {
	$.ajax("http://ip-api.com/json").then(
		function success(response) {
			console.log("User's Location Data is ", response)
			console.log("User's Country", response.country)
		},

		function fail(data, status) {
			console.log("Request failed.  Returned status of", status)
		}
	)
}

async function getAddress(latitude, longitude) {
	const GOOGLE_MAP_KEY = "AIzaSyB7if5NzsR19w1gFH0hIIbzMDlJvUPxfc8"
	let location
	await $.ajax({
		url : "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
			latitude +
			"," +
			longitude +
			"&key=" +
			GOOGLE_MAP_KEY
	, async : false}).then(
		function success(response) {
			console.log("User's Address Data is ", response)
			location = response
			return response
			// alert(console.log("User's Address Data is ", response))
		},
		function fail(status) {
			console.log("Request failed.  Returned status of", status)
			return status
		}
	)
	return location
}

export default getGeoLocation
