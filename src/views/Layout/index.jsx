import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const Layout = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
