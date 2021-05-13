//grab the elements using document query selectors
var searchInputValue = document.querySelector('#city-input');
var searchInputBtn = document.querySelector('#city-submit');
var searchHistoryContainer = document.querySelector('.search-history-section');
var cityResult = document.querySelector('.city-result');
var fiveDayResult = document.querySelector('.five-day-result');


//Set event listerners to the query selector elements 
searchInputBtn.addEventListener('click', searchCity);

//API url and key

//Create the fetch function to fetch data from weather API
function searchCity(e) {
    e.preventDefault;
    var city = searchInputValue.value;
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=5ef304080ee3c4f774ac95eb5d38536f`;
    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
            console.log(data)
        })
}

var displayWeather = function (data){
    var searchResultHeading = document.createElement('h2');
    var searchParagraphTemp = document.createElement('p');
    var searchParagraphWind = document.createElement('p');
    var searchParagraphHumidity = document.createElement('p');
    var searchParagraphUvIndex = document.createElement('p');
    searchResultHeading.textContent = data.name;
    searchParagraphTemp.textContent = data.main.temp + ' °F';
    searchParagraphWind.textContent = data.wind.speed + ' MPH';
    searchParagraphHumidity.textContent = data.main.humidity + ' %';

    var valueObject = [{
        cityName: searchResultHeading.textContent,
        cityTemp: searchParagraphTemp.textContent,
        cityWind: searchParagraphWind.textContent,
        cityHumidity: searchParagraphHumidity.textContent
    }]

    localStorage.setItem(searchResultHeading.textContent, JSON.stringify(valueObject));

    cityResult.append(searchResultHeading);
    searchResultHeading.append(searchParagraphTemp);
    searchParagraphTemp.append(searchParagraphWind);
    searchParagraphWind.append(searchParagraphHumidity);
    
}


//Create the search results function 
//Display city, date
//Display temp
//Display wind
//Display Humidity
//Display uv index

//Create function that displays a five dat forecast
//Use a for loop to loop through the data for the five day forecast
//Create the elements needed to display the forecast
//Display Background
//Display weather emote
//Display Tempeature
//Display Wind Temp
//Display Humidity
//Append the data

//Create a function that when you search for the data its saved to local storage and builds a button so it can be clicked later to get the data back.
//Create button
//Add text to button 
//Append it to the div container
