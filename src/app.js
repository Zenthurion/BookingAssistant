// Some examples:
// https://github.com/swarupbam/Moviebot/blob/master/index.js
// https://chatbotsmagazine.com/creating-nodejs-webhook-for-dialogflow-2b050f76cd75

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const fetch = require('node-fetch');

const params = {
    date: 'date',
    from: 'from',
    to: 'to',
    seats: 'seats',
    building: 'building',
    participants: 'participants'
}

fetch("https://mitsdu.sdu.dk/booking/api/booking/rooms?{}", {"credentials":"omit","headers":{"accept":"application/json, text/javascript, */*; q=0.01","content-type":"application/json; charset=utf-8","x-requested-with":"XMLHttpRequest"},"referrer":"https://mitsdu.sdu.dk/booking/Book.aspx","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"})
    .then(res => res.text())
    .then(body => {
        rooms = JSON.parse(body);
        console.log("Rooms fetched");
    });

var rooms = {};

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello Test Without Delay!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/booking-info', (request, response) => {
    //let data = UserData(request.body.result.parameters, params.date, params.from, params.to, params.seats, params.building, params.participants);
    
    response.send(JSON.stringify(
        {
            "payload": {
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": "this is a simple response"
                      }
                    }
                  ]
                }
              }
            }
          }));
    
    /*if(!data.isValid()) {
        response.send(JSON.stringify({
            "speech": "Invalid data received",
            "displayText" : "Invalid data received"
        }));
        return;
    }
    response.send(JSON.stringify({
        "speech": "Data received successfully",
        "displayText" : "Data received successfully"
    }));*/


});

function UserData(data, date, from, to, seats, building, participants) {
    this.date = data[date]; // convert to date object
    this.time = { // ensure the data is in correct form
        from: data[from], 
        to: data[to]
    }
    this.seats = data[seats]; // check how this is presented to the api
    this.building = data[building];
    this.participants = data[participants]; // should be array of usernames

    isValid = () => { return (this.date != null && this.time.from != null && this.time.to != null && this.seats != null && this.building != null && this.participants != null); }
    
}