const request = require('request')

const forecast = (lon, lat, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=35a6755ef00aaee5c12001e7b294238d&query=' + 
    encodeURIComponent(lat) + ',' +
    encodeURIComponent(lon) + '&units=m'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error){
            callback(error, undefined)
        } else {
            callback(undefined, {
                forecastData: body.current.weather_descriptions[0] + 
                '. It is currently ' + body.current.temperature + 
                ' degrees Celcius out. It feels like ' + body.current.feelslike
            })
        }
    })
}

module.exports = forecast