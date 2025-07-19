import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [lastCity, setLastCity] = useState('Addis Ababa'); // to store last searched city
  const locationRef = useRef();

  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

    axios.get(url).then((response) => {
      setData(response.data);
      setLastCity(city); // update last searched city
      console.log(response.data);
    }).catch((error) => {
      console.log("Error fetching weather:", error);
    });
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const city = locationRef.current.value || lastCity; // fallback to lastCity if input empty
      fetchWeather(city);
      locationRef.current.value = city; // keep searched city in input
    }
  };

  // Fetch Addis Ababa weather by default when component mounts
  useEffect(() => {
    fetchWeather('Addis Ababa');
    if (locationRef.current) {
      locationRef.current.value = 'Addis Ababa';
    }
  }, []);

  return (
    <div className="app">
      <div className="title">Adu Weathery</div>
      <div className='card'>
      <div className="search">
        <input
          ref={locationRef}
          onKeyPress={searchLocation}
          defaultValue="Addis Ababa"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
      </div>
    </div>
  );
}

export default App;
