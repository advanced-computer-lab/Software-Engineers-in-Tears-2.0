const parse = require('csv-parse');
const fs = require('fs');
const mongoose = require('mongoose');
require("dotenv").config({ path: "../config.env" });
const MongoURI = process.env.ATLAS_URI;
const Flight = require('../Models/Flights');

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(connection => console.log('Now connected to MongoDB'))
.catch(err => console.log(err));

async function readCsv(path)
{
    var rows = [];
    var res;
    fs.createReadStream(path).pipe(parse({delimiter:','}))
    .on('data', row => { /*console.log(new Date(new Date('2022-01-01').setHours(hours=2, min=0, sec=0, ms=0)));*/rows.push(row);})
    .on('end', () => {console.log('done');processCsv(rows);})
    
    // console.log(res);                
    // return res;
}

async function processCsv(rows){
    rows = rows.slice(1,rows.length+1);
    rows = rows.map(arr => arr = [arr[0], arr[1], new Date(arr[2]).setHours(2),arr[3], arr[4]]);
    
    rows.forEach(row => {
        var curFlight = new Flight({
            From: row[0],
            To: row [1],
            Flight_Date: row[2],
            Cabin: row[3],
            Seats_Available_on_Flight: row[4]
        });
        curFlight.save().then(result => console.log(result))
        .catch(err => console.log(err));
    });

    // const row = rows[0];
    // var first = new Flight({
    //     From: row[0],
    //         To: row [1],
    //         Flight_Date: row[2],
    //         Cabin: row[3],
    //         Seats_Available_on_Flight: row[4]
    // });
    // first.save().then(result=>console.log(result))
    // .catch(err=>console.log(err));
}

async function insertTest(){
    const test = new Flight({
        From:'test',
        To:'test',
        Flight_Date: new Date(0),
        Cabin: 'test',
        Seats_Available_on_Flight:2
      });
      
    test.save().then(console.log('saved')).catch(err=>console.log(err));
}

// Flight.deleteMany({}).then(res => readCsv('C:/Users/John/Desktop/Flights.csv')).then(console.log('done updating'));
// insertTest();
// readCsv('C:/Users/John/Desktop/Flights.csv');

const data = {  Hi:null,
                Hello:'hello'};
console.log(data);

var testArr = [];
