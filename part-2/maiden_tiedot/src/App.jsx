import { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const fetchData = async () => {
    const [lat, lon] = country.capitalInfo.latlng;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );

    setWeather(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <b>Languages:</b>
      <ul>
        {Object.keys(country.languages).map(lang => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt="Country's flag"
        height={120}
        // width={120}
      />
      <h2>Weather in {country.capital[0]}</h2>
      {weather && (
        <>
          <p>temperature is {weather?.main?.temp} celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>wind is {weather?.wind?.speed} m/s</p>
        </>
      )}
    </div>
  );
};

const Filter = ({ text, countries, setFilter }) => {
  const filtered = [...countries].filter(country =>
    country.name.common.toLowerCase().includes(text.toLowerCase())
  );

  if (filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filtered.length === 1) {
    return <CountryInfo country={filtered[0]} />;
  } else {
    return filtered.map(country => (
      <p key={country.cca2}>
        {country.name.common}{" "}
        <button onClick={() => setFilter(country.name.common)}>show</button>
      </p>
    ));
  }
};

const App = () => {
  // Declare state
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // Input onChange event handler
  const onChange = ({ target }) => setFilter(target.value);

  const fetchData = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(response.data);
  };

  // componentDidMount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>
        find countries <input value={filter} onChange={onChange} />
      </p>
      <Filter text={filter} setFilter={setFilter} countries={countries} />
    </div>
  );
};
export default App;
