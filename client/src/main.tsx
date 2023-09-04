import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


import Header from './components/header.tsx'
import Footer from './components/footer.tsx'
import Onboarding from './pages/onboarding/onboarding.tsx'
import Create from './pages/onboarding/create.tsx'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/onboarding/login/login.tsx'
import LeftHeader from './components/leftHeader.tsx'
import RightHeader from './components/rightHeader.tsx'
import Profile from './pages/profile.tsx'

import { UserContext, UserContextProvider } from './userContext.tsx'

const Layout = () => {
  const { setUserInfo, userInfo } = useContext(UserContext) || {};

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null)
  }

  const username = userInfo?.username
  return <>
    <html lang="en">
      <body>

        {username && (
          <>
            <Header />

            <main className='flex flex-row'>
              <LeftHeader />
              <section className='flex min-h-screen flex-1 flex-col items-center px-6 bg-white pb-10 pt-24 max-md:pb-32 sm:px-10'>
                <div className="w-full max-w-4xl">
                  <Outlet />
                </div>
              </section>
              <RightHeader />
            </main>
            <Footer />
          </>
        )},
        {!username && (
          <>
            <Header />

            <main className='flex flex-row'>
              <section className='flex flex-1 flex-col items-center px-6 bg-white pb-10 pt-20 max-md:pb-32 sm:px-10'>
                <div className="w-full">
                  <Outlet />
                </div>
              </section>
            </main>
          </>
        )}
      </body>
    </html>
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ]
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: '/login',
    element: <Login />
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)
