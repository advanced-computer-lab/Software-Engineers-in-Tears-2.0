import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button5 from "../components/Button5";
import Button1 from "../components/Button1";
import Button6 from "../components/Button6";
import Button7 from "../components/Button7";
import Footer from "../components/Footer";
import {Motion, spring} from 'react-motion';
import "./styles.css";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import axios from 'axios';
import { handle } from "express/lib/application";




function SearchNewDepart(props){

    const history = useHistory();
    const [fromDate, setFromDate] = useState('');
    const [cabin, setCabin] = useState('');
    const toDate =props.location.ReturnflightData.Flight_Date;
    const pcount=props.location.BookingData.PassengerCount;
    const from= props.location.DepartflightData.From;
    const to= props.location.DepartflightData.To;
    

    useEffect(() => {
        axios.post('http://localhost:8000/auth', {token: localStorage.getItem('token')})
          .then(res => {
            if(!res.data.isLoggedIn){
              localStorage.clear();
              history.push('/')
            }
          
          })
          .catch(err => {
            console.log(err);
          })
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            handle(event)
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [handle]);

      function handle(event){

        event.preventDefault();
       
       
        
        var f = new Date(fromDate)
        var t = new Date(toDate)
        
    
        
         if(t.getTime()<f.getTime()){
          alert('Your arrival date is before your departure date!')
        }
        
        else{
        history.push({
            pathname: `/search/from=${from}/to=${to}/cabin=${cabin === '' ? null : cabin}/p=${pcount}/fromDate=${fromDate === '' ? null : fromDate}/toDate=${toDate === '' ? null : toDate}/edit`
        }
        );}
       }

       
    }
export default SearchNewDepart;