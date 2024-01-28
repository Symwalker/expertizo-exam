import React, { useState } from 'react'
import axios from "axios"
// import 'bootstrap/dist/css/bootstrap.min.css';   
import { useEffect } from 'react'
import { WiHumidity } from 'react-icons/wi'
import { RiCloudWindyLine } from 'react-icons/ri'
import { BsThermometerHalf } from 'react-icons/bs'
import { saveSearchName } from '../../config/firebase'
import WeatherNavbar from '../weathernavbar'
// import weat from "./images/weat.jpg"
import './index.css'
import { Link } from 'react-router-dom'
function Wheather() {

    const [inputValue, setInputValue] = useState("")
    const [search, setSearch] = useState('')
    const [WheatherInfo, setWheatherInfo] = useState("")
    const [error, setError] = useState(false);
    const [callApi, setCallApi] = useState(false);
    console.log(WheatherInfo);
   
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${search ? search : "karachi"}&appid=77e48f26ea7bf5f3590ff253f04319a0&units=metric`)
            .then((res) => {
                setWheatherInfo(res.data)
                setError(false)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(true)
            })
    }, [search])

    const handleForm = (e) => {
        // console.log(inputValue);
        e.preventDefault()
        if (!inputValue) {
            return alert("field is empty")

        }
        setCallApi(!callApi)
    }
    // console.log("whater Info ",WheatherInfo);
    const searchresult = async () => {
        const data = {
            name: WheatherInfo.name,
            country: WheatherInfo.sys.country,
            temp: WheatherInfo.main.temp,

        }
        setSearch(inputValue)
        await saveSearchName(data)
        // setSearch('')
        // setInputValue('')

    }
    return (
        <div className='bg-dark main-dabba'>
            <WeatherNavbar />
                <div className="container">
                    <div className='text-center'>
                   <Link to={'/yourSearch'} >
                    <button className='bg-white p-2 font-semibold mx-auto text-center mt-3 rounded-md text-[20px] '>View history </button>
                    </Link>
                    </div>
                <form onSubmit={handleForm} >
                    <input
                        className='inputFiled '
                        value={inputValue}
                        type="text"
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }
                        }
                        placeholder="Search Username..."
                    />
                </form>
                <button className="btn btn-primary clearBtn"
                    onClick={searchresult}>
                    Search
                </button>
            </div>
            {error === false ? (
                <div className="container mt-4 dabba ">
                    <h2 className='text-center text-white mb-0 '>{WheatherInfo ? WheatherInfo.name : "State Name"}</h2>
                    <div className='container  ravi p-4'>
                        <div className="row raaw align-items-center justify-content-between">
                            <div className="col-lg-6 col-md-6  tempera text-center gra"><h2 >{WheatherInfo ? WheatherInfo.main.temp.toFixed(0) : "state temperature"}℃</h2></div>
                            <div className='col-lg-3 col-md-6 text-center'>
                                <ul className=' '>
                                    <li  ><WiHumidity color='black' size={60} />  Humidity :{WheatherInfo ? WheatherInfo.main.humidity : "state humidity"}</li>
                                    <li className=""><BsThermometerHalf color='red' size={60} /> pressure: {WheatherInfo ? WheatherInfo.main.pressure : "state pressure"}</li>
                                    <li className=""><RiCloudWindyLine color='brown' size={60} /> Wind: {WheatherInfo ? WheatherInfo.wind.speed : "User Public Repos"}</li>
                                </ul>

                            </div>
                            {/* <>Humidity: {WheatherInfo ? WheatherInfo.main.humidity : "state humidity"}</>
                        <li>pressure: {WheatherInfo ? WheatherInfo.main.pressure : "state pressure"}</li>
                        <li>temp: {WheatherInfo ? WheatherInfo.main.temp : "state temperature"}</li>
                        <li>Wind: {WheatherInfo ? WheatherInfo.wind.speed : "User Public Repos"}</li> */}
                        </div>
                    </div>
                </div>
            ) : (
                <h1>ERROR</h1>
            )}
        </div>
    )
}

export default Wheather
// b07c09fe617214b0d916c5df88d407eb