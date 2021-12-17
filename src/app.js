const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Calvin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Calvin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Calvin',
        message: 'This page will help you with whatever you want.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {lon, lat, place_name} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(lon, lat, (error, {forecastData} = {}) => {
                if (error) {
                    return res.send({ error })
                } 
                
                res.send({
                    forecastData,
                    location: place_name,
                    address: req.query.address
                })
                
            })
        }
    })
})


app.get('/product', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error_message: 'Help article not found.',
        name: 'Calvin',
        title: 'Help Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops!', 
        error_message: '404 Page Not Found',
        name: 'Calvin'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})