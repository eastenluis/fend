const AYLIENTextAPI = require('aylien_textapi')
const textApi = new AYLIENTextAPI({
    application_id: process.env.AYLIEN_APP_ID,
    application_key: process.env.AYLIEN_APP_KEY,
})

module.exports = textApi
