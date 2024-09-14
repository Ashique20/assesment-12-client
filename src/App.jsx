
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from '../src/Shared/Navbar/Navbar'
import Footer from './Shared/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <div className='bg-white'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
