import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quanLiPhimReducer } from './quanLyPhim'
import {quanLiRapReducer} from './quanLyRap'
import {quanLiUserReducer} from './quanLyUser'
import {quanLiBookingReducer} from './quanLiBooking'
import {loadingReducer} from './loading'

const rootReducer = combineReducers({
    quanLiPhimReducer,quanLiRapReducer,quanLiUserReducer,quanLiBookingReducer,loadingReducer
})

export const store = configureStore({
    reducer: rootReducer
})