const API_KEY = "1c13606af81639ce7dce09b093fd9ccd";
const place = {
    cityName: "",
    stateId: "",
    country: ""
}


const userDiv = document.querySelector("[data-user]");
const searchQuery = document.getElementById("searchbar");


const getData = async (place) => {
    
    const user = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.cityName},${place.stateId},${place.country}&appid=${API_KEY}&units=imperial`,
        {mode: 'cors'}
        );
    const userData = await user.json();
    return userData;
    
}

searchQuery.addEventListener("search", () => {
    let input = searchQuery.value.split(",");
    place.cityName = input[0];
    place.stateId = input[1];
    place.country = input[2];
    console.log(place);
    getData(place).then((data) => {
        console.log(data);
        userDiv.textContent = `City: ${data.name} current temperature (F): ${data.main.temp}`;    
    }).catch(err => {userDiv.textContent = "No search results found."});
    
});

// getData().then((data) => {
//     userDiv.textContent = `City: ${data.name} current temperature (F): ${data.main.temp}`;    
//     console.log(data);
// });



