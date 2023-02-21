import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLiBookingService } from "../../services/quanLiBookingService";
import { loadingAction } from "../loading";

export const { reducer: quanLiBookingReducer, actions: quanLiBookingAction } =
  createSlice({
    name: "quanLiBookingReducer",
    initialState: {
      gheDaDat: [],
      isFetchingroom: false,
      room: {},
      err: "",
      ketQuaDatVe: {},
      isFetchKetQuaDatVe: false,
      errKetQuaDatVe: "",
      value: '1'
    },
    reducers: {
      datGhe: (state, action) => {
        let index = state.gheDaDat.findIndex(
          (ghedd) => ghedd.maGhe === action.payload.maGhe
        );
        if (index !== -1) {
          state.gheDaDat.splice(index, 1);
        } else {
          state.gheDaDat.push(action.payload);
        }
      },
      reset: (state, action) => {
        state.gheDaDat = action.payload;
      },
      setValue: (state,action)=> {
        console.log(action.payload);
        state.value = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        // get room
        .addCase(getRoom.pending, (state, action) => {
          state.isFetchingroom = true;
        })
        .addCase(getRoom.fulfilled, (state, action) => {
          state.isFetchingroom = false;
          state.room = action.payload;
        })
        .addCase(getRoom.rejected, (state, action) => {
          state.isFetchingroom = false;
          state.err = action.payload;
        })
        // dat ve
        .addCase(datVe.pending, (state, action) => {
          state.isFetchKetQuaDatVe = true;
        })
        .addCase(datVe.fulfilled, (state, action) => {
          state.isFetchKetQuaDatVe = false;

          state.ketQuaDatVe = action.payload;
        })
        .addCase(datVe.rejected, (state, action) => {
          state.isFetchKetQuaDatVe = false;
          state.errKetQuaDatVe = action.payload;
        });
    },
  });

export const getRoom = createAsyncThunk(
  "getRoom",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await quanLiBookingService.getRoom(data);

      return res.data.content;
    } catch (err) {
      return err.response.data;
    }
  }
);
export const datVe = createAsyncThunk(
  "datVe",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(loadingAction.setLoading());
      const res = await quanLiBookingService.datVe(data);
      await dispatch(getRoom(data.maLichChieu))
      dispatch(quanLiBookingAction.setValue("2"))
      dispatch(quanLiBookingAction.reset([]))
      dispatch(loadingAction.removeLoading())
      return res.data.content;
    } catch (err) {
      return err.response.data;
    }
  }
);
