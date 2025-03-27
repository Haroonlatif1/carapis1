import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Batch22jsx from './Batch22.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import Batch22 from './batch227.jsx'
import Hero from "./Hero.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Batch22jsx /> */}
    {/* <Batch22/> */}
    <Hero/>
  </StrictMode>,
)
