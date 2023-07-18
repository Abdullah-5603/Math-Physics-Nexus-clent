import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthProviders from './Providers/AuthProviders'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProviders>
    <RouterProvider router={router}/>
  </AuthProviders>
)
