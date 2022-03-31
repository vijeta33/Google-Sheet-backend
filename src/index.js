const express = require('express');
const { google } = require('googleapis')
const credentials = require('./credentials.json')
const JWT = require('jsonwebtoken');
const { sheets } = require('googleapis/build/src/apis/sheets');
const SheetData = require('./sheetData.json')

const app = express();
app.use(express.urlencoded({ extended: true }))

const auth = new google.auth.JWT(
    credentials.client_email, null, credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
    null
)

auth.authorize((err, tokens) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected')
        googlesheet(auth)
    }
})

async function googlesheet(auth) {

    const googlesheetsapi = google.sheets({ version: 'v4', auth: auth })

    const opt = {
        spreadsheetId: '1RYp4aTsHVitwxXawrlWUljYhnaxUIc6OlJ46yDkXfs0',
        range: 'DataSheet!all'
    }

    let data = await googlesheetsapi.spreadsheets.values.get(opt)
    let dataArray = data.data.values
    console.log(dataArray)


}
