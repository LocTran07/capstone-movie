import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../molecules/Footer'
import Header from '../molecules/Header'

const MainLayout = () => {
    // use effect dua len dau 
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    return (
        <div >
            <Header></Header>

            <Outlet></Outlet>

            <Footer></Footer>
        </div>
    )
}

export default MainLayout