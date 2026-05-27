import axios from 'axios'
import { useState, useEffect } from 'react'

const Countries = (props) => {
  const matchingCountries = props.countries
  const matchingCountrieslength = matchingCountries.length


  console.log(matchingCountrieslength);
  console.log(props)
  if (matchingCountrieslength <= 0) {
    return
  } else if (matchingCountrieslength > 10) {
    return <>Too many matches, specify another filter</>
  } else if (matchingCountrieslength === 1) {
    return <CountryDetailed country={props.country}></CountryDetailed>
  } else {
    return (
      <ul>
        {matchingCountries.map(country => {
          <Country country={country}></Country>
        })}
      </ul>
    )
  }
}

const CountryDetailed = (props) => {
  console.log(props)
  return (
    <li>
      {props.country.name.common}
    </li>
  )
}


const Country = (props) => {
  return (
    <li>
      {props.country.name.common}
    </li>
  )
}

const App = () => {
  const [countries, setCountries ] = useState([])
  // const [matchingCountries, setMatchingCountries] = useState([])
  const [country, setCountry] = useState([])
  // const [countryName, setCountryName] = useState(null)
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

  // const getCountry = () => {
  //   console.log("ok");
  //   if (countryName) {
  //     axios
  //       .get(`${linkToCountry}${country}`)
  //       .then(response => {
  //         setCountry(response.data)
  //       })
  //     }
  //   }

  const matchingCountries = countries
                        .filter(country =>
                        country.name.common.toLowerCase().includes(search.toLowerCase()))
  console.log(matchingCountries);
  // console.log(countries)
  // console.log(search);
  // console.log(countries
  //   .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  // );

  

    
  if (matchingCountries.length === 1) {
    const countryName = matchingCountries[0].name.common
  } else {
    const countryName = null
    setCountry([])
  }

  useEffect(getAllCountries, [])
  // useEffect(getCountry, [countryName])

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
      {/* <Countries search={search} countries={matchingCountries} country={country} ></Countries> */}
    </div>
    )
  }

  export default App