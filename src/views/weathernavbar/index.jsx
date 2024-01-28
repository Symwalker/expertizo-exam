import React from 'react'
import { Link } from 'react-router-dom'

const WeatherNavbar = () => {
    return (
        // <div className='container-fluid searc text-center'>
        //     <h1 className='text-center text-white p-2'>Weather Search</h1>
        //     <Link to={'/yourSearch'} className='righ'>History</Link>
        // </div>
        <div className=' searc text-center relative'>
             <h1 className='text-center  text-white font-bold p-2'>Weather Search</h1>
            {/* <Link to={'/yourSearch'} className='text-[22px] font-bold absolute bottom-8 underline  text-white right-10'>History</Link> */}
        </div>
    )
}

export default WeatherNavbar
