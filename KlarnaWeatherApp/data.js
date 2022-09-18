const getData = async (location) => {
	return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.trim()}?unitGroup=metric&key=46EWUPFNKY965SXNMTJUUXWQV&contentType=json`)
		.then((response) => {
			if(response.ok)
				return response.json()
			else throw new Error('Location not found ...')
		})
		.then((json) => {
			return json
		})
		.catch((error) => {
			throw error
		})
}

export default getData