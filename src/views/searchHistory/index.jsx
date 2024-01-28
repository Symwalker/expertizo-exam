import React, { useEffect, useState } from 'react'
import { getAllSearch } from '../../config/firebase'
import WeatherNavbar from '../weathernavbar';
import './index.css'
import { Link } from 'react-router-dom';
const AllHistory = () => {
  const [history, setHistory] = useState([])
  console.log(history);
  const getAllHistory = async () => {
    const res = await getAllSearch()
    setHistory(res)
  }
  useEffect(() => {
    getAllHistory()       
  }, [])
  return (
    <div className='bg-dark min-h-[100vh]'>
      <div className='container-fluid searc text-center p-3 relative'>
            <h1 className='text-center text-white text-[25px]  font-bold p-2'>Weather Search</h1>
            <Link to={'/yourSearch'} className='text-[16px] font-bold absolute bottom-7 md:bottom-8 underline  text-white right-5 md:right-7'>History</Link>
      </div>
      {/* <WeatherNavbar /> */}
      <div className='max-w-[600px]  mx-auto'>
        <div className='mt-20 mx-5 pb-10'>
          {history.map((sea) => (
            <div className='dabbi mx-2 rounded-md flex mt-5 items-center justify-between px-2 '>
              <div className=''>
              <h2 className='text-[32px] text-white font-bold'>{sea.name}</h2>
              </div>
              <div className='text-white   gap-1 py-2 flex flex-col justify-center'>
                
              <h2 className='font-bold  text-[25px]'>{sea.temp.toFixed(0)} ℃</h2>
              <h2 className='text-end underline text-[22px] font-semibold'>{sea.country}</h2>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AllHistory
