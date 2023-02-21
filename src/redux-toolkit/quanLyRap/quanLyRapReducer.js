import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { quanLiRapService } from "../../services";



export const { reducer: quanLiRapReducer, actions: quanLiRapAction } = createSlice({
    name: 'quanLiRapReducer',
    initialState: {
        heThongRap: [],
        isFeching: false,
        err: null,
        lichChieu: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
        // he thong 
            .addCase(getSystem.pending, (state, action) => {
                state.isFeching = true
            })
            .addCase(getSystem.fulfilled, (state, action) => {
                state.isFeching = false
                state.heThongRap = action.payload
            })
            // lich chieu
            .addCase(getLichChieu.pending, (state) => {
                state.isFeching = true
            })
            .addCase(getLichChieu.fulfilled, (state, action) => {
                state.isFeching = false;
                state.lichChieu = action.payload
            })
    }

})
export const getSystem = createAsyncThunk('getRap', async () => {
    try {
        const res = await quanLiRapService.getSystem()
        return res.data.content
    } catch (err) {

    }
})
export const getLichChieu = createAsyncThunk('getLichChieu', async (id) => {
    try {
        const res = await quanLiRapService.getLichChieu(id)
        return res.data.content
    } catch (err) { }
})