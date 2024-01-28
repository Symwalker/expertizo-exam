import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import shayan from "../../assets/shayan.JPG"
import { FiPhone } from "react-icons/fi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { getSingleItem } from '../../config/firebase';
import { SlLocationPin } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const ProductDetail = () => {
    const [product, setProduct] = useState()
    console.log(product);
    const { id } = useParams()
    console.log(id);
    const getAd = async () => {
        const ad = await getSingleItem(id)
        setProduct(ad)
    }
    useEffect(() => {
        getAd()
        // fetch(`https://dummyjson.com/products/${id}`)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setProduct(res)
        //     })
    }, [])
    if (!product) {
        return <h1>Loading</h1>
    }
    return (
        <div className=' max-w-[1400px] mx-auto mt-10'>
            <div className=' flex gap-10'>
                <div className=' w-[70%]'>
                    <div id="carouselExampleIndicators" className="carousel slide bg-black">
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={0}
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            />
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={1}
                                aria-label="Slide 2"
                            />
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={2}
                                aria-label="Slide 3"
                            />
                        </div>
                        <div>
                            <img src={product.imageURL} className="d-block w-[550px] h-[550px] ms-auto me-auto" alt="..." />

                        </div>
                        {/* <div className="carousel-inner">
                            <div className="carousel-item active ">
                                <img src={product.images[0]} className="d-block w-[550px] h-[550px] ms-auto me-auto" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={product.images[1]} className="d-block w-[550px] h-[550px] ms-auto me-auto" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={product.images[3]} className="d-block w-[550px] h-[550px] ms-auto me-auto" alt="..." />
                            </div>
                        </div> */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className=' w-[30%]'>
                    <div className='border pb-3 border-gray-400'>

                        <div className='flex p-3 gap-3 '>
                            <img src={shayan} className='rounded-full w-1/5' />
                            <div className='flex flex-col justify-between '>
                                <p className='font-bold'>Shayan</p>
                                <p>Member since Mar 2023</p>
                                <p className='font-bold text-[16px] flex items-center gap-1'>See Profile <SlArrowRight size={12} /> </p>
                            </div>
                        </div>
                        <div className='w-full p-[10px]'>
                            <button className='bg-[#002F34] w-full py-[12px] flex justify-center items-center gap-2 rounded-[6px] font-bold text-[19px] text-white'>
                                <FiPhone size={23} /> Show Phone Number
                            </button>
                        </div>
                        <div className='w-full  px-[10px]'>
                            <button className='flex justify-center hover:border-6 items-center gap-2 w-full py-[12px] rounded-[6px] font-bold text-[19px] border-2 border-black'>
                                <IoChatbubblesOutline size={25} />  Chat
                            </button>
                        </div>
                    </div>
                    <div className='border p-3 border-gray-400 mt-3'>
                        <h2 className='font-bold text-[22px] pb-2 '>Location</h2>
                        <p className='flex items-center text-[18px] font-medium gap-1'><span className=''><SlLocationPin size={22}/></span>Johar Town, Lahore</p>
                    </div>

                </div>
            </div>
            <div className='mt-10 border  flex flex-col gap-4 p-3   border-gray-400'>
                <h2 className='text-black font-bold text-[40px] '>{product.price} $</h2>
                <h2 className='text-black font-bold text-[20px] '> {product.title}</h2>
                <h2 className='text-black font-bold text-[20px] '> {product.description}</h2>
            </div>
        </div>
    )
}

export default ProductDetail
