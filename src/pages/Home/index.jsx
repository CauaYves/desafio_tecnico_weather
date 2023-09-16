import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from "recharts"

const Home = () => {
  const [temperature, setTemperature] = useState('')
  const [weather, setWeather] = useState('')
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')

  const getWeather = () => {
  axios
    .get(`${import.meta.env.VITE_API_BASE}weather?q=${search}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
    .then((result) => {
      delete result.data.main.pressure
      delete result.data.main.humidity
      delete result.data.main.feels_like
      console.log(result)
      setCity(result.data.name)
      setWeather(result.data.weather[0])
      refactApiData(result.data.main)
    });
  }

  const refactApiData = (data) => {
    const dataGraph = [
      {
        temp: parseFloat(data.temp_min - 2.5).toFixed(1),
      },
      {
        temp: data.temp_min,
      },
      {
        temp: parseFloat(data.temp_min + 2.5).toFixed(1),
      },      
      {
        temp: parseFloat(data.temp - 2.5).toFixed(1),
      },
      {
        temp: data.temp,
      },
      {
        temp: parseFloat(data.temp + 2.5).toFixed(1),
      }, 
      {
        temp: parseFloat(data.temp_max - 2.5).toFixed(1),
      },
      {
        temp: data.temp_max,
      },
      {
        temp: parseFloat(data.temp_max + 2.5).toFixed(1),
      }, 
    ]
    setTemperature(dataGraph)
  }
  console.log(temperature)
  return(
    <Main>
      <h1><strong>Levo um casaquinho?</strong></h1>

      <Search>
        <input 
          type="text" 
          placeholder="procure por uma cidade.." 
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={getWeather}>Buscar</button>
      </Search>

      <Temperature>
        <LeftBox>
          <h2>Agora: {city}</h2>
          <p>Mínima: {temperature ? temperature[0].temp : ''}ºC</p>
          <p>Máxima: {temperature ? temperature[8].temp : ''}ºC</p>
        </LeftBox>
        <RightBox>
          <p>{weather.description}</p>
          <h2>{temperature ? temperature[5].temp : ''}ºC</h2>
        </RightBox>        
      </Temperature>
      
      <Graphic>
        <LineChart width={500} height={300} data={temperature} margin={{top: 5, right: 5, left: 5, bottom: 5}}>
          <XAxis dataKey="none"/>
          <YAxis/>
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </Graphic>
      
    </Main>
  )
}

export default Home

const Main = styled.main`

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 800px;
  margin: auto;
  h1{
    color: #2B0BDE;
  }
`

const Search = styled.div`
  margin: 15px 0px 40px 0px;
`

const Temperature = styled.div`
  background-color: gray;
  width: 500px;
  border-radius: 10px;
  padding: 15px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p,h2{
    color: #FFFFFF;
    font-size: .9em;
  }
`
const LeftBox = styled.div`
  h2{
    font-size: large;
    margin-bottom: 10px;
  }
  p{
    font-size: small;
  }
`

const RightBox = styled.div`
  h2{
    font-size: xx-large;
    margin-bottom: 10px;
  }
`

const Graphic = styled.div`
  background-color: red;
`