import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88'
              },
            },
          }}
        ></Toaster>
      </div>
      <div>
        <header >
          <Header></Header>
        </header>
        <main  >
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout