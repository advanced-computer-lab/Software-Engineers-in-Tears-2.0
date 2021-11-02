
import React, { Component } from 'react';
import  {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



//import { createIndexes } from '../../../models/User.js';

function CreateFlight() {

  
const [input, setInput]=useState({
 
  From:'',
  To:'',
  Flight_Date:'',
  Cabin:'',
  Seats_Available:''
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
     From:input.From,
     To:input.To,
     Flight_Date:input.Flight_Date,
     Cabin:input.Cabin,
     Seats_Available:input.Seats_Available


   }
  axios.post('http://localhost:8000/createflight',newFlight)
  }
  
  
  return (
    <div>
<header> Create a Flight</header> <br/>
<form name="createflight" id="createflight" >



    <label>From</label> <br/>
    <div class="form-group">
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
        <input type="text" value={input.Seats_Available} class="form-control" id="ecs" onChange={create} name="Seats_Available" /><br/>
        </div>
      
      <button onClick={handle}>Create</button>
       
   </form>
    </div>


     
    )


 }
export default CreateFlight;