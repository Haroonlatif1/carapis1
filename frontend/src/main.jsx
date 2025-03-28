import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "./Dashboard.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Batch22jsx /> */}
    {/* <Batch22/> */}
    <Hero/>
  </StrictMode>,
)
