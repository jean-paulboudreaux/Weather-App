import React, {useEffect, useState} from 'react'
import axios from 'axios'
import clouds from './assets/cloudy.jpeg'
import sunset from './assets/sunset.jpg'
import thunderStorm from './assets/thunderstorm.jpg'
import mist from './assets/mist.jpg'
import rain from './assets/rain.jpg'
import drizzle from './assets/drizzle.png'
import clear from './assets/clear.jpeg'
import { BiSearch } from "react-icons/bi";

function App() {
  const [data, setData] = useState({})
  const[location, setLocation] = useState('')
  const[isSearchClicked, setIsSearchClicked] = useState(false)
console.log(isSearchClicked)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=9b450459e80d95b1f26d5b19692bfcf9`
  const searchLocation = (event) => {
    console.log("function is running")
  
    if( isSearchClicked || (event && event.key === 'Enter')){
      console.log("hello")
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
  
      })
      setIsSearchClicked(false)
      setLocation('')
    }
  
    
  }
  
  const clickButton = (event) => {
    console.log("button clicked")
    setIsSearchClicked(true)
    searchLocation(event)
   
  }

  const styleBackground = () => {
    if(data.weather) {
      if(data.weather[0].main ==="Clouds"){
        return  { backgroundImage: `url(${clouds})`,
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left:"0",
      }
    } else if (data.weather[0].main ==="Thunderstorm") {
      return  { backgroundImage: `url(${thunderStorm})`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left:"0",
    }
    } else if (data.weather[0].main ==="Mist") {
      return  { backgroundImage: `url(${mist})`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left:"0",
    }
    }else if (data.weather[0].main ==="Rain") {
      return  { backgroundImage: `url(${rain})`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left:"0",
    }
    }else if (data.weather[0].main ==="Drizzle") {
      return  { backgroundImage: `url(${drizzle})`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left:"0",
    }
    }else if (data.weather[0].main ==="Clear") {
      return  { backgroundImage: `url(${clear})`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left:"0",
    }
    }else {
      return { backgroundImage: `url(${sunset})`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left:"0",
      zIndex: "-1"}
      
    }
    }
    
}

  return (
    <div className="app" 
    style={styleBackground()}
    >
      <div className="search">
        <input
        value={location}
        onChange= {event => setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        placeholder= 'Enter Location'
        type="text"/>
        
        <button id="search-icon-button-id" className='search-icon-button' onClick={(event) => {clickButton( event)}}><BiSearch className='search-icon'/></button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp-and-description-wrapper">
            <p className="temp">
              {data.main ? <h1> {data.main.temp.toFixed()}°F</h1> : null}
            </p>
            <p className="description">
              {data.weather ?  <p>{data.weather[0].main}</p> : null}
            </p>
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
  );
}

export default App;
