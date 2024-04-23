import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './hooks/ProtectedRoute'
import ProtectedBack from './hooks/ProtectedBack'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './components/Layout';


const App = () => {
  return (
    <>
    <ToastContainer />
       <BrowserRouter>
        <Routes>

        <Route
            path="/"
            element={
              <Layout>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Layout>
            }
          />

        <Route
            path="/login"
            element={
                <ProtectedBack>
                  <Login />
                </ProtectedBack>
            }
          />

        <Route
            path="/register"
            element={
                <ProtectedBack>
                  <Register />
                </ProtectedBack>
            }
          />

        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
