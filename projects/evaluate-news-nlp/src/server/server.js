const dotenv = require('dotenv')
const path = require('path')
const express = require('express')

dotenv.config()
const textApi = require('./textAPIClient')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.get('/api/classify', (req, res) => {
    const { url } = req.query
    if (!url) {
        res.status(400).send('Invalid Parameter: URL is required.')
        return
    }
    textApi.classify({ url }, (error, response) => {
        if (error) {
            console.error(error)
            res.status(500).send(`AylienTextAPIError: ${error.message}`)
            return
        }
        res.status(200).send(response)
    })
})

app.get('/api/summarize', (req, res) => {
    const { url, } = req.query
    if (!url) {
        res.status(400).send('Invalid Parameter: URL is required.')
        return
    }
    textApi.summarize({ url, sentences_number: 5}, (error, response) => {
        if (error) {
            console.error(error)
            res.status(500).send(`AylienTextAPIError: ${error.message}`)
            return
        }
        res.status(200).send(response)
    })
})

app.use(express.static('dist'))
app.get('/', (req, res) => {
    res.sendFile('/index.html')
})
module.exports = app
