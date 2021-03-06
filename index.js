const Promise = require('bluebird')

const WeatherAPI = require('./api/WeatherAPI')
const dictionary = require('./utterances/dictionary')
const interjections = require('./utterances/interjections')
const variants = require('./utterances/variants')
const weather = require('./utterances/weather')
const phrases = require('./utterances/phrases')

var location = "Los Angeles"
var unit = "F"

// const temp = WeatherAPI.getTemp(location, unit).temp

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
    // event.reply('#welcome')

    const txt = txt => bp.messenger.createText(event.user.id, txt)
    const quick = (message, quick_reply) => bp.messenger.createText(event.user.id, message, quick_reply)

    bp.convo.start(event, convo => {
      convo.messageTypes = ['text', 'message', 'postback', 'quick_reply']

      convo.say(txt(phrases.robobotGreeting()))
      convo.switchTo('default')

      convo.threads['default'].addQuestion(txt(phrases.mainMenuOptions()), [
        {
          pattern: weather.weather,
          callback: () => {
            convo.say(txt("weather it is"))
            convo.switchTo('weather')
          }
        },
        {
          pattern: dictionary.dictionary,
          callback: () => {
            convo.say(txt("dictionary time"))
            convo.switchTo('dictionary')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt(phrases.badInput()))
            convo.switchTo('default')
          }
        }
      ])
      convo.createThread('weather')
      convo.threads['weather'].addQuestion(txt(phrases.getTempUnit()), [
        {
          pattern: /(celsius|fahrenheit|kelvin|C|F|K)/i,
          callback: (response) => {
            switch(response.match.toLowerCase()) {
              case 'celsius':
                convo.set('unit', 'C')
                break
              case 'c':
                convo.set('unit', 'C')
                break
              case 'fahrenheit':
                convo.set('unit', 'F')
                break
              case 'f':
                convo.set('unit', 'F')
                break
              case 'kelvin':
                convo.set('unit', 'K')
                break
              case 'k':
                convo.set('unit', 'K')
                break
              default:
                convo.set('unit', 'C')
            }
            unit = convo.get('unit')
            convo.next()
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt(phrases.badInput()))
            convo.repeat()
          }
        }
      ])
      convo.threads['weather'].addQuestion(txt(phrases.getWeatherCity()), [
        {
          pattern: /(\D+)/i,
          callback: (response) => {
            convo.set('location', response.match)
            WeatherAPI.getTemp(convo.get('location'), unit).then(function(retObj) {
              event.reply('#weather', {
                temp: retObj.temp,
                location: retObj.name,
                unit: unit
              })
              convo.next()
            }, function(error) {
              event.reply('#weatherError', {
                error: error
              })
              convo.switchTo('repeatWeather')
            })
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt(phrases.badInput()))
            convo.repeat()
          }
        }
      ])
      // ask user if they want more weather info
      // yes-> dump and reload weather thread
      // no-> return to main menu
      convo.threads['weather'].addQuestion(txt(phrases.promptForMoreWeather()), [
        {
          pattern: interjections.yes,
          callback: () => {
            convo.say(txt(phrases.newWeatherReport()))
            convo.switchTo('repeatWeather')
          }
        },
        {
          pattern: interjections.no,
          callback: () => {
            convo.say(txt(phrases.returnToMainMenu()))
            convo.switchTo('default')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt(phrases.badInput()))
            convo.repeat()
          }
        }
      ])

      convo.createThread('repeatWeather')
      convo.threads['repeatWeather'].addMessage(txt(phrases.moreCowbell()), () => {
        return convo.switchTo('weather')
      })

      convo.createThread('dictionary')
      convo.threads['dictionary'].addQuestion(txt(phrases.getDictionaryWord()), [
        {
          default: true,
          callback: () => {
            convo.say(txt("ok thats the word"))
          }
        }
      ])

    })


    bp.hear({
      type: /message|text/i,
      text: /exit|bye|goodbye|quit|done|leave|stop/i
    }, (event, next) => {
      event.reply('#goodbye', {
        reason: 'too much tuna'
      })
    })

  })
}
