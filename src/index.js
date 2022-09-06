const API_KEY = "1c13606af81639ce7dce09b093fd9ccd"; //Probably should hide this but whatever
//TODO: get main and create a card div for each city
const cards = document.getElementById("main");
// const weatherData = document.querySelector("[data-weather]");
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
const createNewCard = (data) => {
    const newCard = document.createElement("div");
    newCard.setAttribute("data-weather", "weather");
    fillCardWithData(data, newCard);
    // newCard.innerText = `City: ${data.name} current temperature (F): ${data.main.temp}`;
    cards.appendChild(newCard);
}

searchQuery.addEventListener("search", () => {
    const input = searchQuery.value.split(",");
    [place.cityName, place.stateId, place.country] = [...input];
    console.log(place);
    getData(place)
        .then((data) => {
            console.log(data);
            createNewCard(data);
        })
        .catch(err => {
            console.log(err);
            //weatherData.textContent = "No search results found.";
        });
});

// Will set the data from the api into a new card
const fillCardWithData = (data, card) => {
    const h1 = document.createElement("h1");
    h1.classList.add("temp");
    const h2 = document.createElement("h2");
    h2.classList.add("city");
    const p = document.createElement("p");
    p.classList.add("sky");

    h2.innerText = data.name;
    h1.innerText = `${Math.round(data.main.temp)}º`;
    p.innerText = data.weather[0].description;

    card.appendChild(h2);
    card.appendChild(h1);
    card.appendChild(p);


    //card.innerText = `City: ${data.name} current temperature (F): ${data.main.temp}`;
}




