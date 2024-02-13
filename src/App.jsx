import { CiSearch } from "react-icons/ci";
import { useState } from "react";

import icon01d from "../public/weather-icons/01d.png";
import icon01n from "../public/weather-icons/01n.png";
import icon02d from "../public/weather-icons/02d.png";
import icon02n from "../public/weather-icons/02n.png";
import icon03d from "../public/weather-icons/03d.png";
import icon03n from "../public/weather-icons/03n.png";
import icon04d from "../public/weather-icons/04d.png";
import icon04n from "../public/weather-icons/04n.png";
import icon09d from "../public/weather-icons/09d.png";
import icon09n from "../public/weather-icons/09n.png";
import icon10d from "../public/weather-icons/10d.png";
import icon10n from "../public/weather-icons/10n.png";
import icon11d from "../public/weather-icons/11d.png";
import icon11n from "../public/weather-icons/11n.png";
import icon13d from "../public/weather-icons/13d.png";
import icon13n from "../public/weather-icons/13n.png";
import icon50d from "../public/weather-icons/50d.png";
import icon50n from "../public/weather-icons/50n.png";

const WeatherApp = () => {
  const getWeatherIconUrl = (iconCode) => {
    const iconMapping = {
      "01d": icon01d,
      "01n": icon01n,
      "02d": icon02d,
      "02n": icon02n,
      "03d": icon03d,
      "03n": icon03n,
      "04d": icon04d,
      "04n": icon04n,
      "09d": icon09d,
      "09n": icon09n,
      "10d": icon10d,
      "10n": icon10n,
      "11d": icon11d,
      "11n": icon11n,
      "13d": icon13d,
      "13n": icon13n,
      "50d": icon50d,
      "50n": icon50n,
    };
    return iconMapping[iconCode]; // Set defaultIcon to a default image path
  };

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "a4e94c18fda375e078cb6761180e9083";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError("City not found. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div>
            <button type="submit">
              <CiSearch style={{ fontSize: "25px" }} />
            </button>
          </div>
        </div>
      </form>

      {error && <p>{error}</p>}

      {weatherData ? (
        <div>
          <div className="col2">

            <div className="description">
            <div className="icon">
            <img
              src={getWeatherIconUrl(weatherData.weather[0].icon)}
              alt="weather icon"
              style={{ width: '90px', height: '90px' }}
            />
            </div>
            


              <p> {weatherData.weather[0].description}</p>
              <p style={{ fontSize: "35px", fontWeight: "bold" }}>
                {Math.round(weatherData.main.temp - 273.15)}°C
              </p>
              <h2>{weatherData.name}</h2>

              
            </div>



          </div>



          <div className="col1">
            <div className="col">
              <img
                src="data:image/png;base64,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"
                alt="humidity icon"
              ></img>
              <div>
                <p style={{ fontSize: "30px" }}>{weatherData.main.humidity}%</p>
                <p style={{ fontSize: "15px" }}>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img
                src="data:image/png;base64,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"
                alt="wind icon"
              ></img>
              <div>
                <p style={{ fontSize: "30px" }}>{weatherData.wind.speed} m/s</p>
                <p style={{ fontSize: "15px" }}>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col1">
          <div className="col">
            <img
              src="data:image/png;base64,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"
              alt="humidity icon"
            ></img>
            <div>
              <p style={{ fontSize: "15px" }}>Humidity</p>
            </div>
          </div>

          <div className="col">
            <img
              src="data:image/png;base64,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"
              alt="wind icon"
            ></img>
            <div>
              <p style={{ fontSize: "15px" }}>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
