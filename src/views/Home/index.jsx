import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./index.css"
import bg from "../../assets/weat.jpg"
import { WiHumidity } from 'react-icons/wi'
import { RiCloudWindyLine } from 'react-icons/ri'
import { BsThermometerHalf } from 'react-icons/bs'  
import { Link } from 'react-router-dom'
import { saveSearchName } from '../../config/firebase'
const Home = () => {
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
        <div>
            <Link to={'/yourSearch'}>
            <button className='flex justify-center items-center mt-3 font-semibold text-[20px] bg-white text-center mx-auto p-2 rounded-[4px] shadow-md drop-shadow-md  '>View History</button>
            </Link>

            <div>
                <form onSubmit={handleForm} >
                    <input
                        className='inputFiled outline-none'
                        value={inputValue}
                        type="text"
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }
                        }
                        placeholder="Search city/country..."
                    />
                </form>
                <button className="buttonSearch py-2"
                    onClick={searchresult}>
                    Search
                </button>
            </div>

            <div className='p-2 md:p-0'>
                <div className='relative max-w-[1200px] mx-auto mt-3 '>
                    <img src={bg} alt="" className=' w-full absolute h-[350px] sm:h-[370px] md:h-[400px] lg:h-[500px] md:mx-auto  rounded-[20px] object-cover   left-0 right-0  ' />
                    <div className='z-50  relative h-[350px] sm:h-[370px] md:h-[400px] lg:h-[500px]  '>
                        <h2 className='text-white text-center text-[50px] font-bold pt-6'>{WheatherInfo ? WheatherInfo.name : "State Name"}</h2>
                        <div className='mt-2 md:mt-10 flex md:flex-row flex-col justify-between items-center w-[80%] mx-auto'>
                            <h2 className='tempHeading'>{WheatherInfo ? WheatherInfo.main.temp.toFixed(0) : "state temperature"}℃</h2>
                            <div className='flex flex-wrap md:flex-col gap-3'>
                                <div className='flex  items-center gap-2'>
                                <WiHumidity color='black' size={60} />
                                    <span className='md:text-[29px] text-[22px] text-white text-bold'>Humidity :{WheatherInfo ? WheatherInfo.main.humidity : "state humidity"}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                <BsThermometerHalf color='red' size={60} />
                                    <span className='md:text-[29px] text-[22px] text-white text-bold'>Pressure :{WheatherInfo ? WheatherInfo.main.pressure : "state pressure"}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                <RiCloudWindyLine color='brown' size={60} />
                                    <span className='md:text-[29px] text-[22px] text-white text-bold'>Wind: {WheatherInfo ? WheatherInfo.wind.speed : "User Public Repos"}</span>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
