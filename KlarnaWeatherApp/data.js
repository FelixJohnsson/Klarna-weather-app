export default async function getData(){
	return fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4b3e8c2d2d2a7c7a0e2c8b9a9d9b7e1c')
		.then((response) => response.json())
		.then((json) => {
			return json
		})
		.catch((error) => {
			console.error(error)
		})
}