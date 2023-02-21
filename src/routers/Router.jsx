import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import Detail from '../pages/Detail'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import News from '../pages/News'
import BookingTicketLayout from '../components/layouts/BookingTicketLayout'
import BookingTicket from '../pages/BookingTicket'
import Login from '../pages/Login'
import UserLayout from '../components/layouts/UserLayout'
import Register from '../pages/Register'
import Admin from '../components/layouts/Admin'
import Dashboard from '../pages/Dashboard'
import Film from '../pages/Film'
import Showtime from '../pages/Showtime'
import Addfilm from '../pages/Addfilm'
import EditFilm from '../pages/EditFilm'


const Router = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [
                {
                    index: '/',
                    element: <Home></Home>
                },
                {
                    path: 'contact',
                    element:<Contact></Contact>
                },
                {
                    path: 'news',
                    element:<News></News>
                },
                {
                    path: 'detail/:id',
                    element:<Detail></Detail>
                }
                
            ]
        },
        {
            path:'bookingTicketLayout',
            element: <BookingTicketLayout></BookingTicketLayout>,
            children:[
                {
                    path: 'bookingTicket/:id1',
                    element:<BookingTicket></BookingTicket>
                }
            ]
        },
        {
            path:'user',
            element:<UserLayout></UserLayout>,
            children: [
                {
                    path: 'login',
                    element: <Login></Login>
                },
                {
                    path:'register',
                    element:<Register></Register>
                }
            ]

        },{
            path: 'admin',
            element:<Admin></Admin>,
            children: [
                {
                    path:'User',
                    element:<Dashboard></Dashboard>
                },
                {
                    path:'Film',
                    element: <Film></Film>,
                    
                },
                {
                    path: 'Showtime/:id3',
                    element: <Showtime></Showtime>
                },
                {
                    path: 'addFilm',
                    element: <Addfilm></Addfilm>
                },
                {
                    path:'editfilm/:id2',
                    element: <EditFilm></EditFilm>
                }
                
            ]
        }
    ])

    return routing
}

export default Router