import { useRoutes } from 'react-router-dom'
import Navbar from './components/navbar';
import Layout from './views/Layout'
import Home from "./views/Home"
import AllHistory from './views/searchHistory';

const App = () => {
  let routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/yourSearch",
          element: <AllHistory />,
        },
        // {
        //   path: "/yourSearch",
        //   element: <AllHistory />,
        // },


      ]
    },


  ];
  let element = useRoutes(routes);


  return (
    <div className='bg-[#212529] h-[100vh]'>
      <Navbar />
      {element}
    </div>
  )
}

export default App
