const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const AYLIENTextAPI = require('aylien_textapi')

dotenv.config()
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const textApi = new AYLIENTextAPI({
    application_id: process.env.AYLIEN_APP_ID,
    application_key: process.env.AYLIEN_APP_KEY,
})

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
    const { url } = req.query
    if (!url) {
        res.status(400).send('Invalid Parameter: URL is required.')
        return
    }
    textApi.summarize({ url }, (error, response) => {
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

// designates what port the app will listen to for incoming requests
const port = 8081
app.listen(port, () => {
    console.log(`Evaluate NLP service listening on port ${port}.`)
})
