import React, { useEffect, useState } from 'react'
import { getAllSearch } from '../../config/firebase'
import './index.css'
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
