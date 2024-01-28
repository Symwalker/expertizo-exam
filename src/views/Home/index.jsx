import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import Categories from '../../components/CategoriesSection'
import Card from '../../components/Card'
import { getItems } from '../../config/firebase'

const Home = () => {
    const [products, setProducts] = useState([])
    const getAllProducts =async ()=>{
      const ads =  await getItems()
      setProducts(ads)
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <div>
            <Banner />
            <Categories />
            <div className='max-w-[1400px] mx-auto mt-20'>
                <div className='flex flex-wrap gap-6'>

                    {
                        products.map((product) => (
                            <Card brand={product.brand} category={product.category} thumbnail={product.imageURL} desc={product.description} id={product.id} images={product.images} price={product.price} rating={product.rating}  title={product.title} />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
