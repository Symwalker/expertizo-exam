import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div className='relative  '>
        <Outlet />
    </div>
  )
}

export default Layout
