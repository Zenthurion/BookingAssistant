// Some examples:
// https://github.com/swarupbam/Moviebot/blob/master/index.js
// https://chatbotsmagazine.com/creating-nodejs-webhook-for-dialogflow-2b050f76cd75

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const params = {
    date: 'date',
    from: 'from',
    to: 'to',
    seats: 'seats',
    building: 'building',
    participants: 'participants'
}

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello Test Without Delay!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/booking-info', (request, response) => {
    let data = UserData(request.body.result.parameters, params.date, params.from, params.to, params.seats, params.building, params.participants);
    
    response.send(JSON.stringify({
        "speech": "Data received successfully",
        "displayText" : "Data received successfully"
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