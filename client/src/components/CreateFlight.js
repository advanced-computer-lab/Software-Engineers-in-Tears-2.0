
import React, { Component } from 'react';
import  {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



//import { createIndexes } from '../../../models/User.js';

function CreateFlight() {

  
const [input, setInput]=useState({
  FlightNumber:'',
  AirportTerminal:'',
  DepartureTime:'',
  ArrivalTime:'',
  From:'',
  To:'',
  Flight_Date:'',
  Cabin:'',
  Seats_Available_on_Flight:''
})
  
  function create(event){
   const{name,value} = event.target;
   setInput( prevInput =>{
     return{
       ...prevInput,
       [name]:value
     }
   }

   )
  }
  function handle(event){
   event.preventDefault();

   const newFlight={
    FlightNumber: input.FlightNumber,
    AirportTerminal: input.AirportTerminal,
    DepartureTime: input.DepartureTime,
    ArrivalTime: input.ArrivalTime,
    From:input.From,
    To:input.To,
    Flight_Date:input.Flight_Date,
    Cabin:input.Cabin,
    Seats_Available_on_Flight:input.Seats_Available_on_Flight


   }
  axios.post('http://localhost:8000/admincreateflights',newFlight).then(res => {
    console.log(res.data)
  })
  .catch(err =>{
    console.log(err);
  })
  }
  
  
  return (
    <div>
<header> Create a Flight</header> <br/>
<form name="admincreateflights" id="admincreateflights" >



    
    <div class="form-group">
    <label>FlightNumber</label> <br/>
        <input type="text" value={input.FlightNumber} class="form-control" id="fnumber" onChange={create} name="FlightNumber" /> <br/>
        </div>

        <div class="form-group">
    <label>AirportTerminal</label> <br/>
        <input type="text" value={input.AirportTerminal} class="form-control" id="terminal" onChange={create} name="AirportTerminal" /> <br/>
        </div> 

        <div class="form-group">
    <label>DepartureTime</label> <br/>
        <input type="time" value={input.DepartureTime} class="form-control" id="dtime" onChange={create} name="DepartureTime" /> <br/>
        </div> 

        <div class="form-group">
    <label>ArrivalTime</label> <br/>
        <input type="time" value={input.ArrivalTime} class="form-control" id="atime" onChange={create} name="ArrivalTime" /> <br/>
        </div>

        <div class="form-group">
    <label>From</label> <br/>
        <input type="text" value={input.From} class="form-control" id="from" onChange={create} name="From" /> <br/>
        </div>

        <label>To</label> <br/>
        <div class="form-group">
        <input type="text" value={input.To} class="form-control" id="to" onChange={create} name="To" /><br/>
        </div>

       
        <label>Flight Date</label> <br/>
        <div class="form-group">
        <input type="date"  value={input.Flight_Date} class="form-control" id="date" onChange={create} name="Flight_Date"/> <br/>
        </div>
        
        <label>Cabin</label> <br/>
        <div class="form-group">
        <input type="text" value={input.Cabin} class="form-control" id="cabin" onChange={create} name="Cabin"/><br/>
        </div>
        <label>Seats Available</label> <br/>
        <div class="form-group">
        <input type="number" value={input.Seats_Available_on_Flight} class="form-control" id="ecs" onChange={create} name="Seats_Available_on_Flight" /><br/>
        </div>
      
      <button onClick={handle}>Create</button>
       
   </form>
    </div>


     
    )


 }
export default CreateFlight;