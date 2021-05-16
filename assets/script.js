//grab the elements using document query selectors
var searchInputValue = document.querySelector('#city-input');
var searchInputBtn = document.querySelector('#city-submit');
var searchHistoryContainer = document.querySelector('.search-history-section');
var cityResult = document.querySelector('.city-result');
var fiveDayResult = document.querySelector('.five-day-result');
var cityButton = document.querySelector('.city-button');
var cities = JSON.parse(localStorage.getItem('cities')) || [];

//Moment JS
var currentDate = moment();
var nextFiveDays = moment().add(5, 'd');

//Set event listerners to the query selector elements 
searchInputBtn.addEventListener('click', searchCity);
searchHistoryContainer.addEventListener('click', searchCity);

//Global Variables for the search display
var searchResultHeading = document.createElement('h2');
var searchParagraphTemp = document.createElement('p');
var searchParagraphWind = document.createElement('p');
var searchParagraphHumidity = document.createElement('p');

//Create the fetch function to fetch data from weather API
function searchCity(e) {
    e.preventDefault;
    console.log(e);
    if(e.target.id === 'city-submit'){
        var city = searchInputValue.value;
    }else{
        var city = e.target.textContent;
    }
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=5ef304080ee3c4f774ac95eb5d38536f`;

    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=5ef304080ee3c4f774ac95eb5d38536f`;

    //Fetch current weather
    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
            uvIndexFetch(data);
            if(e.target.id === 'city-submit'){
                setLocalStorage(data);
                allCities();
            }
            console.log(data);
        })

    //Fetch forecast
    fetch(forecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDayForecast(data);
            console.log(data);
        })

    //Fetch UV Index
    var uvIndexFetch = function (data) {
        var lon = data.coord.lon;
        var lat = data.coord.lat;

        var uvIndexUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=5ef304080ee3c4f774ac95eb5d38536f`;

        fetch(uvIndexUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayUvi(data);
                console.log(data);
            })
    }
}

//Create the search results function 

var displayWeather = function (data) {
    //Resets the city results container everytime the function runs
    cityResult.innerHTML = '';

    //Adding classes to the HTML elements
    searchResultHeading.classList.add('city-result-heading');
    searchParagraphTemp.classList.add('city-result-paragraph');
    searchParagraphWind.classList.add('city-result-paragraph');
    searchParagraphHumidity.classList.add('city-result-paragraph');

    /*WeatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);*/

    //add api data to the text content of the HTMl elements
    searchResultHeading.textContent = data.name + ' ' + currentDate.format('l');
    searchParagraphTemp.textContent = 'Temp: ' + data.main.temp + ' °F';
    searchParagraphWind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
    searchParagraphHumidity.textContent = 'Humidity: ' + data.main.humidity + ' %';

    //Apending the elements to the div container
    cityResult.append(searchResultHeading);
    cityResult.append(searchParagraphTemp);
    cityResult.append(searchParagraphWind);
    cityResult.append(searchParagraphHumidity);
}

//Create the function that display the uv index
var displayUvi = function (data) {
    //Creates the paragraph element
    var searchParagraphUvIndex = document.createElement('p');
    //Add the class to the element
    searchParagraphUvIndex.classList.add('city-result-paragraph', 'uv-color');
    //Change the text content to the api data
    searchParagraphUvIndex.textContent = 'UV Index: ' + data.current.uvi;
    //Apend the paragraph element to the div container
    cityResult.append(searchParagraphUvIndex);
}

//Create a function that when you search for the data its saved to local storage
var setLocalStorage = function (data) {
    //create the variable value object that is set to an array of the data.name which is the city name
    var valueObject = [data.name];
    //take the data from value object variable which is the city name and push it into the cities variable 
    cities.push(valueObject);
    console.log(cities);
    //Set the cities variables to local storage
    localStorage.setItem('cities', JSON.stringify(cities));

}

//This function works when you search a city it creates a button that saves the city so you can be able to click back on the button afterwards to get the data back to be displayed
var allCities = function() {
    searchHistoryContainer.innerHTML = '';
    for(var i = 0; i < cities.length; i++){

        var searchHistoryButton = document.createElement('div');
        searchHistoryButton.innerHTML = `
        <button class="city-button">${cities[i]}</button>
        `
        searchHistoryContainer.append(searchHistoryButton);
    }
}


//Create function that displays a five day forecast

var fiveDayForecast = function (data) {
    fiveDayResult.innerHTML = '';
    //Create the elements
    var fiveDayHeadingContainer = document.createElement('div');
    var fiveDayHeading = document.createElement('h2');
    fiveDayHeadingContainer.classList.add('col-xl-12', 'col-lg-12', 'col-md-12');
    fiveDayHeading.textContent = '5-Day Forecast:';
    fiveDayResult.append(fiveDayHeadingContainer);
    fiveDayHeadingContainer.append(fiveDayHeading);

    //Use a for loop to loop through the data for the five day forecast
    for (var i = 0; i < data.list.length; i++) {
        console.log(data.list[i]);
        var fiveDayForecastContainer = document.createElement('div');
        var fiveDayDate = document.createElement('p');
        var fiveDayWeatherIcon = document.createElement('img');
        var fiveDayForecastTemp = document.createElement('p');
        var fiveDayForecastWind = document.createElement('p');
        var fiveDayForecastHumidity = document.createElement('p');

        //Adding classes and setting attributes
        fiveDayForecastContainer.classList.add('col-xl-2', 'col-lg-2', 'col-md-2', 'forecast-container');
        fiveDayWeatherIcon.classList.add('forecast-image');
        fiveDayDate.textContent = nextFiveDays.format('l');
        fiveDayWeatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);

        //adding the textcontent in the elements
        fiveDayForecastTemp.textContent = 'Temp: ' + data.list[i].main.temp + ' °F';
        fiveDayForecastWind.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
        fiveDayForecastHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';

        //Appending the variables to the page
        fiveDayResult.append(fiveDayForecastContainer);
        fiveDayForecastContainer.append(fiveDayDate);
        fiveDayForecastContainer.append(fiveDayWeatherIcon);
        fiveDayForecastContainer.append(fiveDayForecastTemp);
        fiveDayForecastContainer.append(fiveDayForecastWind);
        fiveDayForecastContainer.append(fiveDayForecastHumidity);
    }
}

allCities();