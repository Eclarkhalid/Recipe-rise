import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserContext } from "@/userContext";

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext) || {};

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
    <nav className="flex fixed top-0 z-30 w-full items-center justify-between bg-backgroundColor px-6 py-3">
      <Link to={'/'} className="z-20 flex items-center text-lg font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-2 h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
        </svg>

        Recipe Rise
      </Link>
      <div className="flex items-center gap-1">
        {username && (
          <>
          <Button variant={'destructive'} onClick={logout}>Logout</Button>
          </>
        )}
        {!username && (
          <>
          <div className="flex gap-3">
          <Button variant={'ghost'} onClick={() => window.location.href='/login'}>Sign In</Button>
          <Button variant={'outline'} onClick={() => window.location.href='/onboarding'}>Sign Up</Button>
          </div>
          </>
        )}
      </div>
    </nav>
  </>;
}

export default Header;