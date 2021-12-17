const request = require('request')

const geoCode = (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
    encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoiY2F0c2FuZyIsImEiOiJja3g3ZDdldW8wMHN6MnB0ODVwOTI3YzRqIn0.hL8VzeGHEbFh68_OtwZSXA&limit=1'
    
    request({url, json:true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                place_name: body.features[0].place_name, 
                lat: body.features[0].center[1], 
                lon: body.features[0].center[0]})
        }

    })
}

module.exports = geoCode