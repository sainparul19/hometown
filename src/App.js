import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState("");
  const [submit, setSubmit] = useState(false);

  const fetchCountry = async () => {
    try {
      const country = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setSubmit(false);
    setCity(null);
    setSingleCountry(country);
    const findCities = countries.find((c) => c.country === country);
    setCities(findCities.cities);
  };

  const submitHandler = () => {
    if (singleCountry && city) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Select Your Hometown</h1>
        <div>
          {countries && (
            <select
              onChange={(e) => fetchCities(e.target.value)}
              value={singleCountry}
            >
              <option disabled selected hidden>
                Select Country
              </option>
              {countries.map((country) => (
                <option
                  key={`${country.country} - ${Date.now()}`}
                  value={country.country}
                >
                  {country.country}
                </option>
              ))}
            </select>
          )}

          {cities && (
            <select onChange={(e) => setCity(e.target.value)} value={city}>
              <option disabled selected hidden>
                Select City
              </option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
          <button onClick={submitHandler}>Go</button>
        </div>
        {submit && (
          <h3>
            Your country is {singleCountry} and your city is {city}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
