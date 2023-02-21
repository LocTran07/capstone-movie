import React, { useEffect } from 'react'
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'
import BookingTicket from '../../pages/BookingTicket'
import { USER_lOGIN } from '../../utils/setting'

const BookingTicketLayout = () => {
  
    useEffect(()=> {window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });})
    return (
        <div>
            <BookingTicket>
            </BookingTicket>
        </div>
    )
}

export default BookingTicketLayout