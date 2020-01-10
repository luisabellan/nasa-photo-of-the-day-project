import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.scss";

import Moment from "react-moment";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Card() {
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=j8MvcwHy1qL4XgDz8qnCW7gFaf8MqNSuKALMSpAt`
      )
      .then(res => setData(res.data));
  }, []);

  const toggleDate = e => {
    e.preventDefault();
    const input = document.getElementById("toggle");
    if (input.className.match("hidden")) {
      input.className = "show";
    } else {
      input.className = "hidden";
    }
  };

  const onChange = date => {
    setStartDate(date);
    console.log(startDate);
    let fancyDate = moment(date).format("YYYY-MM-DD");
    console.log(fancyDate);
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=JnWo6HiIwC9BG0xa2UyobaexzaMVqCbQi9h9hs6q&date=${fancyDate}`
      )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="up">
        <h1>{data.title}</h1>
      </div>

      <div className="middle-container">
        <div className="left">
          <div className="date-container">
            <Moment className="date" format="MMMM Do YYYY">
              {data.date}
            </Moment>
          </div>
          <h3>Description</h3>
          <p> {data.explanation}</p>
        </div>

        <div className="right">
          <img alt={data.title} src={data.hdurl} />
          <p>Author: {data.copyright}</p>
        </div>
      </div>

      <div className="bottom">
      <button className="date-picker" onClick={toggleDate}>
            <span>Choose date</span>
          </button>

        <form>
         
          <DatePicker
            selected={startDate}
            id="toggle"
            className="hidden"
            onChange={onChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Card;
