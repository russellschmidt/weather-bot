const _ = require('lodash')

const phrases = {
  robobotGreeting: () => _.sample([
    "I am Robo-bot 2000, an invention from the distant future, the year 2000.",
    "I am from the future. The year 2000. Hail Robo-bot 2000.",
    "Greetings from the future. It is I, Robo-bot 2000, from 2000 AD.",
    "Hello, user. They call me Robo-bot 2000, a robot from the future Earth in the year 2000.",
    "¿Qué tal? Me llamo ROBO-BOT 2000 porque soy del futuro en el año dos mil.",
    "Oh, hello there friend. Come, have a chat. I am Robo-bot 2000, a Robot from the distant future of 2000AD",
    "I am Robotic Ordinal Basic Order Robot 2000, but you can call me Robo-bot 2000, friend.",
    "ROBOT BOT 2K aka Robo-bot 2000 aka Bobby Steel aka ROBOTOZOA aka Big Baby Robot on the 1s and 2s.",
    "The future is here today. Robo-bot 2000 reporting for duty :)"
  ]),

  mainMenuOptions: () => _.sample([
    'I can provide WEATHER, DICTIONARY. Type your choice.'
  ]),

  badInput: () => _.sample([
    'Sorry I do not understand.',
    'Does not compute.',
    'No comprendo',
    'Je ne comprends pas',
    'わかりません',
    '我不明白',
    'Я не понимаю',
    'Syntax error please try again'
  ]),

  getTempUnit: () => _.sample([
    `Do you want the temperature in Celsius, Fahrenheit, or Kelvin? (C, F, K)?`,
    `Let's play a game of FCK (Fahrenheit, Celsius, or Kelvin) (pick one)`,
    `Are you americano (F for Fahrenheit), normal human (C for Celsius), or citizen of the universe (K for Kelvin)`
  ]),

  weatherError: (error) => _.sample([
    `Error! ${error}`
  ]),

  getWeatherCity: () => _.sample([
    "Type in a city to get the weather",
    "For which city's weather shall I please you?",
    "Give me a city. I tell you the weather"
  ]),

  promptForMoreWeather: () => _.sample([
    "Would you like to check the weather in a different city?",
    "Want more weather from a different place?",
    "Are you a true weather lover and want to check the weather elsewhere?"
  ]),

  getDictionaryWord: () => _.sample([
    "Tell me a word and I can define it for you",
    "People say I know the best words.",
    "Wordsleuthing, well that, that is what I do."
  ]),

  newWeatherReport: () => _.sample([
    "I C U love weather well let's have some more, then",
    "From wither comes weather, whether you wish or will the wind",
    "More weather for you coming right up on the flip flap"
  ]),

  moreCowbell: () => _.sample([
    "More cowbell",
    "Moar cow bells",
    "lets do it again",
    "oooops i did it again. gave you more weather. weather forecast all day. oh baby baby"
  ]),

  returnToMainMenu: () => _.sample([
    "No more weather... for now",
    "So much for the weather!",
    "Agree, enough of this weather business",
    "The rain in Spain falls mainly on the plane, bye weather"
  ])

}

module.exports = phrases
