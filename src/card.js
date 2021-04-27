const temperatureInCelsius = (temperature) => {
    //Kelvin to celsius
    return Math.floor(temperature - 273.15)
}

const createElement = (type, className='') => {
    const elem = document.createElement(type)
    if (className === '') {
        return elem
    }

    elem.className = className
    return elem
}

const createSection1 = data => {
    const s1 = createElement('section', 'flex flex-col w-3/6 justify-center')

    const infoContainer = createElement('div')

    const country = createElement('span', 'flex flex-col items-center')
    
    //TODO: Move this to a function
    const countryFlag = createElement('img', 'w-14 sm:w-20 lg:w-32 my-2')
    countryFlag.src = `https://flagcdn.com/120x90/${data.sys.country.toLowerCase()}.png`
    countryFlag.srcset = `https://flagcdn.com/240x180/${data.sys.country.toLowerCase()}.png 2x`
    countryFlag.alt = 'Country flag'

    country.appendChild(countryFlag)

    const status = createElement('span', 'flex flex-col justify-center')

    const statusImg = createElement('img', 'w-12 sm:w-20 lg:w-28 mx-auto')
    statusImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    status.title = `${data.weather[0].main}`

    status.appendChild(statusImg)

    const temperature = createElement('div', 'text-3xl sm:text-5xl lg:text-7xl')
    
    const temperatureInfo = createElement('h3')
    temperatureInfo.innerText = `${temperatureInCelsius(data.main.temp)}℃`

    temperature.appendChild(temperatureInfo)

    infoContainer.append(country, status, temperature)

    s1.appendChild(infoContainer)
    return s1
}

const createSection2 = data => {
    const s2 = createElement('section', 'flex flex-col w-3/6 justify-center')

    const city = createElement('span', 'sm:text-3xl md:text-5xl lg:text-6xl text-xl')
    city.innerText = data.name

    const secondaryInfoContainer = createElement('div', 'flex flex-col')

    const humidity = createElement('span', 'my-1.5')
    humidity.innerText = `Humidity: ${data.main.humidity}%`

    const wind = createElement('span', 'my-1.5')
    wind.innerText = `Wind speed: ${data.wind.speed} m/s`

    const feelsLike = createElement('span', 'my-1.5')
    feelsLike.innerText = `Feels like: ${temperatureInCelsius(data.main.feels_like)}℃`

    secondaryInfoContainer.append(humidity, wind, feelsLike)
    s2.append(city, secondaryInfoContainer)

    return s2
}

const createWeatherCard = data => {
    /* weather card */
    const wc = createElement('div', 'weather-card flex p-4 min-w-max')
    /* section 1 */
    const s1 = createSection1(data)
    
    /* section 2 */
    const s2 = createSection2(data)

    wc.append(s1, s2)
    return wc
}

export const createCard = data => {
    return createWeatherCard(data)
} 