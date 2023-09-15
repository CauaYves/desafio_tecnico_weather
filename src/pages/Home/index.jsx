import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from "recharts"

const Home = () => {
  const [weather, setWeather] = useState(null)
  const [search, setSearch] = useState('')

  const getWeather = () => {
  axios
    .get(`${import.meta.env.VITE_API_BASE}weather?q=${search}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
    .then((result) => {
      delete result.data.main.pressure
      delete result.data.main.humidity
      delete result.data.main.feels_like
      refactApiData(result.data.main)
    });
  }

  const refactApiData = (data) => {
    console.log(data)
    const dataGraph = [
      {
        temp: data.temp_min,
        name: 'temp min',
        amt: (data.temp_max + data.temp_min) / 2,
      },
      {
        temp: data.temp,
        name: 'temp media',
        amt: (data.temp_max + data.temp_min) / 2,

      },
      {
        temp: data.temp_max,
        amt: (data.temp_max + data.temp_min) / 2,
        name: 'temp max',
      }
    ]
    setWeather(dataGraph)
  }

  console.log(weather)
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
        <div>
          <h2>Agora: [CIDADE]</h2>
          <p>Mínima: [GRAUS MINIMOS]</p>
          <p>Máxima: [GRAUS MAXIMOS]</p>
        </div>
        <div>
          <p>[CLIMA ATUAL]</p>
          <h2>[TEMPERATURA ATUAL]</h2>
        </div>        
      </Temperature>
      
      <Graphic>
        <LineChart width={500} height={300} data={weather}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip />
          <Legend />
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

const Graphic = styled.div`
`