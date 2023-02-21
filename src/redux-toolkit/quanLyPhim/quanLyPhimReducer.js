import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getValue } from "@testing-library/user-event/dist/utils";

import axios from "axios";
import { quanLiPhimService } from "../../services";



export const { reducer: quanLiPhimReducer, actions: quanLiPhimActions } = createSlice({
    name: 'quanLyPhim',
    initialState: {
        bannerList: [],
        movieList: [],
        detailMovie:{},
        isPendingBannerList: false,
        err: '',
        isPendingAddFilm : false, addFilm: '', errAddFilm: '',
        isPendingGetEdit : false, edit: {}, errEdit: '',
        isPendingUpdateFilm: false ,updateFilm: null , errUpdateFilm: null,
        isPendingDeleteFilm: false ,deleteFilm: null , errDeleteFilm: null,

    },
    reducers: {},
    extraReducers: (builder) => {
      
        builder 
        // getBannerList
            .addCase(getBannerList.pending, (state, action) => {
                state.isPendingBannerList = true
            })
            .addCase(getBannerList.fulfilled, (state, action) => {
                
                state.bannerList = action.payload
                state.isPendingBannerList = false
            })
            .addCase(getBannerList.rejected, (state, action) => {
                state.error = action.payload
                state.isPendingBannerList = false
            })

            // movieList
            .addCase(getMovieList.pending, (state, action) => {
                state.isPendingBannerList = true
            })
            .addCase(getMovieList.fulfilled, (state, action) => {
                
                state.movieList = action.payload
                state.isPendingBannerList = false
            })
            .addCase(getMovieList.rejected, (state, action) => {
                state.error = action.payload
                state.isPendingBannerList = false
            })
            // detail movie
            .addCase(getDetailMovie.pending,(state)=> {
                state.isPendingBannerList = true
            })
            .addCase(getDetailMovie.fulfilled, (state,action)=> {
                state.isPendingBannerList = false
                state.detailMovie = action.payload
            })
            
            // addFilm
            .addCase(addFilm.pending,(state,action)=>{
                state.isPendingAddFilm = true
            })
            .addCase(addFilm.fulfilled, (state,action)=> {
                state.isPendingAddFilm = false
                state.addFilm = action.payload
            })
            .addCase(addFilm.rejected, (state,action)=> {
                state.isPendingAddFilm = false
                state.errAddFilm = action.payload
            })
            
            //get edit
            .addCase(getEdit.pending,(state,action)=>{
                state.isPendingGetEdit = true
            })
            .addCase(getEdit.fulfilled, (state,action)=> {
                state.isPendingGetEdit = false
                state.edit = action.payload
            })
            .addCase(getEdit.rejected, (state,action)=> {
                state.isPendingGetEdit = false
                state.errEdit = action.payload
            })
            //updateFilm
            .addCase(updateFilm.pending,(state,action)=>{
                state.isPendingUpdateFilm = true
            })
            .addCase(updateFilm.fulfilled, (state,action)=> {
                state.isPendingUpdateFilm = false
                state.updateFilm = action.payload
            })
            .addCase(updateFilm.rejected, (state,action)=> {
                state.isPendingUpdateFilm = false
                state.updateFilm = action.payload
            })
            //deleetFilm
            .addCase(deleteFilm.pending,(state,action)=>{
                state.isPendingDeleteFilm = true
            })
            .addCase(deleteFilm.fulfilled, (state,action)=> {
                state.isPendingDeleteFilm = false
                state.deleteFilm = action.payload
            })
            .addCase(deleteFilm.rejected, (state,action)=> {
                state.isPendingDeleteFilm = false
                state.errDeleteFilm = action.payload
            })
    }
})

export const getBannerList = createAsyncThunk('getBannerList', async (data, { dispatch, getState, rejectWithValue }) => {
    try {
   
        const res = await quanLiPhimService.getMovieBanner()

        return res.data.content
    }
    catch (err) {
        rejectWithValue(err.response.data)

    }
}) 
export const getMovieList = createAsyncThunk('getMovieList', async (data, { dispatch, getState, rejectWithValue }) => {
    try {
        const res = await quanLiPhimService.getMovieList(data)
    
        return res.data.content
    }
    catch (err) {
        rejectWithValue(err.response.data)

    }
}) 

export const getDetailMovie = createAsyncThunk('getDetailMovie', async (data)=> {
    try{
        const res = await quanLiPhimService.getMovieDetail(data)
        return res.data.content
    }catch(err){

    }
})

// upload film 

export const addFilm = createAsyncThunk('addFilm', async(data, {dispatch,getValue,rejectWithValue}) => {
    try{
        const res = await quanLiPhimService.addFilm(data)
        console.log(res.data.content);
        return res.data.content
    }catch(err){
      

        return rejectWithValue(err.response.data.content)
    }
})

// get edit
export const getEdit = createAsyncThunk('getEdit', async (data,{rejectWithValue})=> {
    try{
        const res = await quanLiPhimService.getEdit(data)
 
        return res.data.content
    }catch(err){
     

        return rejectWithValue(err.response.data.content)
    }
})

// updatefilm 
export const updateFilm = createAsyncThunk('updateFilm', async (data,{rejectWithValue})=> {
    try{
        const res = await quanLiPhimService.updateFilm(data)
        console.log(res.data.content);
        return res.data.content
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data.content)
    }
})
// deletefilm 
export const deleteFilm = createAsyncThunk('deleteFilm', async (data,{dispatch,rejectWithValue})=> {
    try{
        const res = await quanLiPhimService.deleteFilm(data)

        dispatch(getMovieList())
        return res.data.content
    }catch(err){
      
        return rejectWithValue(err.response.data.content)
    }
})