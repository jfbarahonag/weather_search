import { createCard } from "./card";

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

const printCard = (data) => {
  const {name, main, cod} = data
  if (cod != 200) {
      alert('Please enter a valid city')
      return
  }

  const wc = createCard(data)

  if (!card.hasChildNodes()) {
    alert('Ups! Something is wrong. Retry please!')
    return
  }
  
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
    .then(printCard)
}

submit.addEventListener('click', getCity)
