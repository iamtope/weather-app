let appID = 'c3b5cdabd69601848e0f6320a8054122'; //initializing the API
let units = 'metric'; //set the unit of measurement either Celcius or Fahrenheit
let searchMethod; //declaring the search input to take either a Zip or City Name

//determines whether a Zip code is entered or a city name
function getSearchMethod(searchTerm){
	if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod='zip';
	else
		searchMethod='q';
}


function searchWeather(searchTerm){
	getSearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`).then(result=>{
		return result.json(); //this line converts the result to JSON
	}).then(result=>{
		init(result);
	})
	//back ticks (``) are used such that JS can inject parameters 
	//fetch is used to call the URL of the API to get the weather information using the search term as pulled from the search input
	//.then(result) is used to delay the loading of the page so that the resulting information from the API can be gotten before the page continues to load
}
function init(resultFromServer){
	//console.log(resultFromServer);
	let welcome = document.getElementById('welcome');
		welcome.style.visibility = 'hidden';
	let instruction = document.getElementById('instruction');
		instruction.style.visibility = 'hidden';
	switch(resultFromServer.weather[0].main){
		case "Clear":
			document.body.style.backgroundImage = 'url("clear2.jpg")';
			break;

		case "Clouds":
			document.body.style.backgroundImage = 'url("cloudy.jpeg")';
			break;

		case "Rain":
		case "Drizzle":
		case "Mist":
			document.body.style.backgroundImage = 'url("rain.jpeg")';
			break;

		case "Thunderstorm":
			document.body.style.backgroundImage = 'url("storm.jpeg")';
			break;

		case "Snow":
			document.body.style.backgroundImage = 'url("snow.jpeg")';
			break;

		case "Haze":
			document.body.style.backgroundImage = 'url("haze.jpeg")';
			break;

		default:
			document.body.style.backgroundImage = 'url("default.jpeg")';
			break;
}

	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windSpeedElement = document.getElementById('windSpeed');
	let cityHeader = document.getElementById('cityHeader');
	let weatherIcon = document.getElementById('documentIconImg');
	let coordLatitude = document.getElementById('latitude');
	let coordLongitude = document.getElementById('longitude');

	weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
	let resultDescription  = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	windSpeedElement.innerHTML = "Wind Speed is " + Math.floor(resultFromServer.wind.speed) + 'm/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidity level is ' + resultFromServer.main.humidity + '%';
	coordLatitude.innerText = 'Latitude ' + resultFromServer.coord.lat;
	coordLongitude.innerText = 'Longitude ' +resultFromServer.coord.lon;

	setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight = weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;

	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
	 weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () =>{
	let searchTerm= document.getElementById('searchInput').value;
	if (searchTerm)
		searchWeather(searchTerm);
})




