const API_KEY = "1c13606af81639ce7dce09b093fd9ccd"; //Probably should hide this but whatever
const cards = document.getElementById("main");
// import { getData } from "./utils/api";
const searchQuery = document.getElementById("searchbar");

// object for storing info of a particular place
const place = {
    cityName: "",
    stateId: "",
    country: ""
}

// Fetch data from API (error handling will happen at a higher level)
const getData = async (place) => {
    const loader = document.createElement("div")
    loader.classList.add("loader");
    cards.appendChild(loader);
    const user = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.cityName},${place.stateId},${place.country}&appid=${API_KEY}&units=imperial`,
        {mode: 'cors'}
        );
    const userData = await user.json();
    cards.removeChild(loader);
    return userData;    
}
// creates a new weather card
const createNewCard = (data) => {
    const newCard = document.createElement("div");
    const del = document.createElement("button");
    del.classList.add("delete");
    del.setAttribute("id", "delete");
    newCard.setAttribute("data-weather", "weather");
    fillCardWithData(data, newCard);
    cards.appendChild(newCard);
    newCard.appendChild(del);
}

// Will set the data from the api into a new card
const fillCardWithData = (data, card) => {
    const temperature = document.createElement("h1");
    temperature.classList.add("temp");
    const city = document.createElement("h2");
    city.classList.add("city");
    const skies = document.createElement("p");
    skies.classList.add("sky");
    const highAndLow = document.createElement("p");
    
    city.innerText = data.name;
    temperature.innerText = `${Math.round(data.main.temp)}º`;
    skies.innerText = data.weather[0].main;
    highAndLow.innerText = `H:${Math.round(data.main.temp_max)}º  L:${Math.round(data.main.temp_min)}º`;

    card.appendChild(city);
    card.appendChild(temperature);
    card.appendChild(skies);
    card.appendChild(highAndLow);
}

searchQuery.addEventListener("search", () => {
    
    const input = searchQuery.value.split(",");

    if(searchQuery.value === "") return; // fixed the 'clear' bug 

    [place.cityName, place.stateId, place.country] = [...input];
    console.log(place);
    getData(place)
        .then((data) => {
            console.log(data);
            createNewCard(data);
            searchQuery.value = "";
        })
        .catch(err => {
            console.log(err);
        });
    });

//removes dynamically created cards by clicking on the "x" button
document.addEventListener("click", (e) => {
    if(e.target && e.target.id === "delete"){
        cards.removeChild(e.target.parentNode); 
    }
});

