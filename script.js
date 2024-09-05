function search() {
    const cityName = document.getElementById("city").value;
    const apiKey = 'd7ce2260647ea773e4c6f1e8b3057552';

    if(!city) {
        alert("Please enter a city");
        return;
    }

    const weatherAPI= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    
}
