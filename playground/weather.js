const WeatherAPI = require('./../api/WeatherAPI')

const loc = "Los Angeles"
const unit = "F"

WeatherAPI.getTemp(loc, unit).then(function(retObj) {
  console.log(retObj.temp)
}, function(err) {
  console.log(err)
})
