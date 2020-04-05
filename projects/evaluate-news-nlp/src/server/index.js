const app = require('./server')

// designates what port the app will listen to for incoming requests
const port = 8081
app.listen(port, () => {
    console.log(`Evaluate NLP service listening on port ${port}.`)
})
exports = app
