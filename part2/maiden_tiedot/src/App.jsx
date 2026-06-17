import axios from 'axios'
import { useState, useEffect } from 'react'

const Countries = (props) => {
  const matchingCountries = props.countries
  const matchingCountrieslength = matchingCountries.length
  
  if (matchingCountrieslength <= 0 || props.search.length === 0) {
    return null
  } else if (props.country != null) {
    return <CountryDetailed country={props.country}></CountryDetailed>
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

const CountryDetailed = ({country}) => {
  if (country) {
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
      </>
    )
  } else {
    return
  }
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
  const [search, setSearch] = useState('')

  const allCountriesLink = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const linkToCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

  const getAllCountries = () => {
    axios
      .get(allCountriesLink)
      .then(response => {
        setCountries(response.data)
      })
  }

  const getCountry = () => {
    if (countryName) {
      axios
        .get(`${linkToCountry}${countryName}`)
        .then(response => {
          setCountry(response.data)
        })
      } else {
        setCountry(null)
      }
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
      <Countries countries={matchingCountries} country={country} search={search} showCountry={showCountry}></Countries>
    </div>
    )
  }

  export default App