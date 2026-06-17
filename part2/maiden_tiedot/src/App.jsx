import axios from 'axios'
import { useState, useEffect } from 'react'

const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY

const Countries = (props) => {
  const matchingCountries = props.countries
  const matchingCountrieslength = matchingCountries.length
  
  if (matchingCountrieslength <= 0 || props.search.length === 0) {
    return null
  } else if (props.country != null) {
    return <CountryDetailed country={props.country} weather={props.weather}></CountryDetailed>
  } else if (matchingCountrieslength > 10) {
    return <>Too many matches, specify another filter</>
  } else if (matchingCountrieslength === 1) {
    return <CountryDetailed country={props.country}></CountryDetailed>
  } else {
    return (
      <ul>
        {matchingCountries.map(country => (
          <Country country={country} showCountry={props.showCountry}></Country>
        ))}
      </ul>
    )
  }
}

const CountryDetailed = ({country, weather}) => {
  if (!country || !weather) {
    return null
  }
  const weatherIconLink = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        {country.capital}
      </div>
      <div>
        Area {country.area}
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      <h2>Weather in {country.capital}</h2>
      <div>
        Temperature {weather.main.temp} Celsius
      </div>
      <img src={weatherIconLink} alt={weather.weather[0].description}>
      </img>
      <div>
        Wind {weather.wind.speed} m/s
      </div>
    </>
  )
}

const Country = (props) => {
  return (
    <li>
      {props.country.name.common}
      <button onClick={() => props.showCountry(props.country.name.common)}>show</button>
    </li>
  )
}


const App = () => {
  const [countries, setCountries ] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [search, setSearch] = useState('')

  const allCountriesLink = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const linkToCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

  const getLinkToCountryWeather = (latlng) => {
    const [lat, lon] = latlng
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    return link
  }

  const getAllCountries = () => {
    axios
      .get(allCountriesLink)
      .then(response => {
        setCountries(response.data)
      })
  }

  const getCountry = () => {
    if (!countryName) {
      setCountry(null)
      setWeather(null)
      return
    }

    axios
      .get(`${linkToCountry}${countryName}`)
      .then(response => {
        const countryData = response.data
        setCountry(countryData)
        const latlng = countryData.capitalInfo.latlng || countryData.latlng
        return axios.get(
          `${getLinkToCountryWeather(latlng)}`
        )
      })
      .then(weatherResponse => {
        const weatherData = weatherResponse.data
        setWeather(weatherData)
      })
      .catch(error => {
        console.error("API error:", error)
      })
  }

  const showCountry = (country) => {
    setSearch(country)
  }

  const matchingCountries = countries
                        .filter(country =>
                        country.name.common.toLowerCase().includes(search.toLowerCase()))
    
  const countryName =
    matchingCountries.length === 1
      ? matchingCountries[0].name.common
      : null

  useEffect(getCountry, [countryName])
  useEffect(getAllCountries, [])

  const handleChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div>
      <form>
        find countries: 
        <input value={search} onChange={handleChange}></input>
      </form>
      <Countries countries={matchingCountries} country={country} weather={weather} search={search} showCountry={showCountry}></Countries>
    </div>
    )
  }

  export default App