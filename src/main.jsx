import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import './index.css'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>,
    <App />

    <h1 className="text-3xl text-blue-900 font-bold underline">Resume CV</h1>
  </BrowserRouter>
)
