import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@mui/material";
import axios from "axios";

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div>
      <input
        className="searchbar"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        variant="outlines"
        sx={{ backgroundColor: "#52be80 ", color: "#fff" }}
      >
        Search
      </Button>
    </div>
  );
};

const WeatherCard = ({ title, reading }) => {
  return (
    <div className="weather-card">
      <h2>{title}</h2>
      <p>{reading}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json`,
          {
            params: {
              Key: "90d0d2fef22e4895bfa52821240511",
              q: city,
            },
          }
        );
        setWeatherData(res.data);
        console.log(res);
      } catch (err) {
        alert("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };
    if (city) {
      getDetails();
    }
  }, [city]);

  return (
    <div className="weatherDisplay">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            reading={`${weatherData.current.temp_c} °C %`}
          />
          <WeatherCard
            title="Humidity"
            reading={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            reading={weatherData.current.condition.text}
          />
          <WeatherCard
            title="Wind Speed"
            reading={`${weatherData.current.wind_kph}kph`}
          />
        </div>
      )}
    </div>
  );
};

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (city) => {
    setSearch(city);
  };

  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} />
      <WeatherDisplay city={search} />
    </div>
  );
}

export default App;
