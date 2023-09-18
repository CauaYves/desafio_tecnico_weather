import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from "recharts"

const Home = () => {
  const [temperature, setTemperature] = useState('')
  const [weather, setWeather] = useState('')
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('') 
  const [futureWeather, setFutureWeather] = useState('')

  const getWeather = () => {
  axios
    .get(`${import.meta.env.VITE_API_BASE}weather?q=${search}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
    .then((result) => {
      delete result.data.main.pressure
      delete result.data.main.humidity
      delete result.data.main.feels_like
      setCity(result.data.name)
      setWeather(result.data.weather[0])
      setTemperature(result.data.main)

    });
    getNextTemperatures()
  }
  const getNextTemperatures = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${import.meta.env.VITE_API_KEY}`)
      .then((res) => {
        const result = (res.data.list).map((data, i) => {
          const timestamp = Number(res.data.list[i].dt);
          const date = new Date(timestamp * 1000);
          const diaDaSemana = date.getDay();
          const daysName = ["(Dom)", "(Seg)", "(Ter)", "(Qua)", "(Qui)", "(Sex)", "(Sáb)"];
          const dayName = daysName[diaDaSemana];
          const dayAndMonth = ((res.data.list[i].dt_txt).slice(5, 10))
          const dayFormatted = dayAndMonth.replace('-', '/')
          return {
            temp: (data.main.temp - 273.15).toFixed(1),
            day: dayFormatted + dayName
          }
        })
        setFutureWeather(result); 
      })
  }

  const changeColorByWeather = () => {
    let color = ''
    switch (weather.description) {
      case 'clear sky':
        color = 'yellow'
      break;
      case 'broken clouds':
        color = 'gray'
      break
      case 'light rain':
        color = 'blue'
      break
      case 'overcast clouds':
        color = 'lightGray'
      break
      case 'Thunderstorm':
        color = 'purple'
      break
      case 'Drizzle':
        color = 'cyan'
      break
      case 'few clouds':
        color = 'lightGray'
      break
    }
    return color
  }
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

      <Temperature color={changeColorByWeather}>
        <LeftBox>
          <h2>Agora: {city}</h2>
          <p>Mínima: {temperature.temp_min}ºC</p>
          <p>Máxima: {temperature.temp_max}ºC</p>
        </LeftBox>
        <RightBox>
          <p>{weather.description}</p>
          <h2>{temperature.temp}ºC</h2>
        </RightBox>        
      </Temperature>
      
      <LineChart width={500} height={300} data={futureWeather} margin={{top: 5, right: 5, left: 5, bottom: 5}}>
        <XAxis dataKey="day"/>
        <YAxis/>
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="0 0"/>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    
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
  background-color: ${props => props.color};
  width: 500px;
  border-radius: 10px;
  padding: 15px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p,h2{
    color: black;
    font-size: .9em;
    text-shadow: 1px 0px 10px white;
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
  p{
    text-align: right;
  }
`