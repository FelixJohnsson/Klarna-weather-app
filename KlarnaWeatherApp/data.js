const searchedLocations = []

export default async function getData(location){
	const found = searchedLocations.filter(item => item.address === location)
	if (found.length > 0) return found[0]
	return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=46EWUPFNKY965SXNMTJUUXWQV&contentType=json`)
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			searchedLocations.push(json)
			return json
		})
		.catch((error) => {
			console.error(error)
			return error
		})
}