const API_KEY = "1c13606af81639ce7dce09b093fd9ccd"; //Probably should hide this but whatever
const weatherData = document.querySelector("[data-weather]");
const searchQuery = document.getElementById("searchbar");

// object for storing info of a particular place
const place = {
    cityName: "",
    stateId: "",
    country: ""
}

// Fetch data from API (error handling will happen at a higher level)
const getData = async (place) => {
    const user = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.cityName},${place.stateId},${place.country}&appid=${API_KEY}&units=imperial`,
        {mode: 'cors'}
        );
    const userData = await user.json();
    return userData;    
}

searchQuery.addEventListener("search", () => {
    const input = searchQuery.value.split(",");
    [place.cityName, place.stateId, place.country] = [...input];
    console.log(place);
    getData(place)
        .then((data) => {
            console.log(data);
            weatherData.textContent = `City: ${data.name} current temperature (F): ${data.main.temp}`;
        })
        .catch(err => {
            weatherData.textContent = "No search results found."
        });
});





