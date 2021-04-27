console.log('Happy hacking :)')

const submit = document.querySelector('.submit')
const card = document.querySelector('.weather')

const KEY = '5a01a3bb7202abb5baa380ccf47903be'

const getData = (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${KEY}`

    return fetch(url)
        .then(data => data.json())
        .catch((err) => {
            return new Error('catch error')
        });
}

const isFieldEmpty = (field) => {
    if (field === '') {
        return true
    }
    return false
}

const temperatureInCelsius = (temperature) => {
  //Kelvin to celsius
  return Math.floor(temperature - 273.15)
}

const createCard = (data) => {
  const {name, main, cod} = data
  if (cod != 200) {
      alert('Please enter a valid city')
      return
  }

  const wc = document.createElement('div')
  wc.className = 'weather-card flex p-4 min-w-max'
  /* --- section 1 --- */
  const s1 = document.createElement('div')
  s1.className = 'flex flex-col w-3/6 justify-center'
  /* */
  const s1Div = document.createElement('div')
  /* */
  let flag = document.createElement('span')
  flag.className = 'flex flex-col items-center'

  const img = document.createElement('img')
  img.className = 'w-14 sm:w-20 lg:w-32 my-2'
  img.src = `https://flagcdn.com/120x90/${data.sys.country.toLowerCase()}.png`
  img.srcset = `https://flagcdn.com/240x180/${data.sys.country.toLowerCase()}.png 2x`
  img.alt = 'Colombia'

  flag.appendChild(img)
  /* */
  const status = document.createElement('span')
  status.className = 'text-2xl'
  status.innerText = data.weather[0].main
  /* */
  const temperatureContainer = document.createElement('div')
  temperatureContainer.className = 'text-3xl sm:text-5xl lg:text-7xl'

  const temperatureInfo = document.createElement('h3')
  temperatureInfo.innerText = `${temperatureInCelsius(data.main.temp)}℃`

  temperatureContainer.appendChild(temperatureInfo)
  /* Append all */
  s1Div.append(flag, status, temperatureContainer)
  s1.appendChild(s1Div)
  /* --- section 2 --- */
  const s2 = document.createElement('div')
  s2.className = 'flex flex-col w-3/6 justify-center'
  /* */
  const city = document.createElement('span')
  city.className = 'sm:text-3xl md:text-5xl lg:text-7xl text-xl'
  city.innerText = data.name
  /* */
  const container = document.createElement('div')
  container.className = 'flex flex-col'
  /* */
  const humidity = document.createElement('span')
  humidity.className = 'my-1.5'
  humidity.innerText = `Humidity: ${data.main.humidity}%`
  /* */
  // const rainChance = document.createElement('span')
  // rainChance.className = 'my-1.5'
  // rainChance.innerText = data.weather.description
  /* */
  const wind = document.createElement('span')
  wind.className = 'my-1.5'
  wind.innerText = `Wind speed: ${data.wind.speed} m/s`
  /* */
  const feelsLike = document.createElement('span')
  feelsLike.className = 'my-1.5'
  feelsLike.innerText = `Feels like: ${data.main.feels_like}℃`
  /* */
  container.append(humidity, wind, feelsLike)
  s2.append(city, container)
  /* */
  wc.append(s1, s2)
  
  while (card.hasChildNodes()) {
    card.removeChild(card.lastChild)
  }

  card.appendChild(wc)
}
  
const getCity = () => {
    if (isFieldEmpty(city.value)) {
        alert('Please insert a city')
        return
    }
    
    const cityStr = city.value
    getData(cityStr)
    .then(createCard)
}

submit.addEventListener('click', getCity)
