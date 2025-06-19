const weatherForm = document.querySelector('#weather-form')

weatherForm.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    const cityName = document.getElementById('city-name').value.trim()

    if (!cityName) {
        return showAlert('É necessário digitar uma cidade...')
    }

    const apiKey = 'SUA_CHAVE_AQUI'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    try {
        showAlert('Buscando informações...')
        
        const response = await fetch(apiUrl)
        const data = await response.json()
        
        if (data.cod === 200) {
            showWeatherInfo(data)
        } else {
            showAlert('Cidade não encontrada. Verifique o nome e tente novamente.')
        }
    } catch (error) {
        showAlert('Erro ao conectar com o serviço de clima.')
        console.error('Erro:', error)
    }
});

function showWeatherInfo(data) {
    showAlert('')
    
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="temp-main">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].description}">
                <span>${data.main.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup></span>
            </div>
            <p class="description">${data.weather[0].description}</p>
            <div class="weather-details">
                <p><i class="fas fa-temperature-high"></i> Máx: ${data.main.temp_max.toFixed(1)}°C</p>
                <p><i class="fas fa-temperature-low"></i> Mín: ${data.main.temp_min.toFixed(1)}°C</p>
                <p><i class="fas fa-tint"></i> Umidade: ${data.main.humidity}%</p>
                <p><i class="fas fa-wind"></i> Vento: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
            </div>
        </div>
    `;
}

function showAlert(msg) {
    const alertElement = document.getElementById('alert')
    const errorElement = document.getElementById('alert-error')
    
    errorElement.textContent = msg;
    alertElement.style.display = msg ? 'block' : 'none'
}