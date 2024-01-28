import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Banner from './components/Banner'
import Categories from './components/CategoriesSection'
import Home from './views/Home'
import { useNavigate, useParams, useRoutes } from 'react-router-dom'
import Layout from './views/Layout'
import ProductDetail from './views/productDetails'
import Login from './views/login'
import Signup from './views/singup'
import Footer from './components/footer'
import Sellitem from './views/sellItem'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import User from './user'
import Wheather from './views/wheatherApp'
import AllHistory from './views/searchHistory'

const App = () => {
  let routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/user/profile/me",
          element: <User />,
        },
        
        {
          path: "/sellItem",
          element: <Sellitem />,
        }
      ]
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/wheather",
      element: <Wheather />,
    },
    {
      path: "/yourSearch",
      element: <AllHistory />,
    },

  ];
  let element = useRoutes(routes);
  const { pathname } = window.location
  const [userr, setUser ]= useState()
  console.log(pathname);
  const navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  },[])
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/login" || pathname === "/register") {
          navigate('/')
        }
      } else {
        if (pathname === "/sellItem") {
          navigate('/login')

        }
      }
    })
  }, [pathname,userr])
  return (
    <div>
      {element}
    </div>
  )
}

export default App
