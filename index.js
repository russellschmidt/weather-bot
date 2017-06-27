const Promise = require('bluebird')
const WeatherAPI = require('./api/weatherAPI')

const loc = "Los Angeles"
const unit = "F"

const temp = WeatherAPI.getTemp(loc, unit).temp

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
    event.reply('#welcome')
  })


  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    event.reply('#goodbye', {
      reason: 'too much tuna'
    })
  })

  bp.hear({
    type: /message|text/i,
    text: /weather/i,
  }, (event, next) => {
    WeatherAPI.getTemp(loc, unit).then(function(retObj) {
      event.reply('#weather', {
        temp: retObj.temp,
        loc: retObj.name,
        unit: unit
      })
    }, function(err) {
      event.reply('#weatherError', {
        retObj: err
      })
    })
  })
}
