export default async function getData(location){
	return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=46EWUPFNKY965SXNMTJUUXWQV&contentType=json`)
		.then((response) => response.json())
		.then((json) => {
			console.info(json)
			return json
		})
		.catch((error) => {
			console.error(error)
			return error
		})
}