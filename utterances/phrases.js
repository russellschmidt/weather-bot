const _ = require('lodash')

const phrases = {
  robobotGreeting: () => _.sample([
    "I am Robo-bot 2000, an invention from the distant future, the year 2000.",
    "I am from the future. The year 2000. Robo-bot 2000.",
    "Greetings from the future. It is I, Robo-bot 2000, from 2000 AD."
  ]),

  mainMenuOptions: () => _.sample([
    'I can provide WEATHER, DICTIONARY. Type your choice.'
  ]),

  badInput: () => _.sample([
    'Sorry I do not understand.',
    'Does not compute.'
  ]),

  getTempUnit: () => _.sample([
    `Do you want the temperature in Celsius, Fahrenheit, or Kelvin? (C, F, K)?`
  ]),

  weather: (temp, location, unit) => _.sample([
    `It is ${temp} ${unit} in ${location}`
  ]),

  weatherError: (error) => _.sample([
    `Error! ${error}`
  ]),

  getWeatherCity: () => _.sample([
    "Type in a city to get the weather"
  ]),

  getDictionaryWord: () => _.sample([
    "Tell me a word and I can define it for you"
  ]),

}

module.exports = phrases
