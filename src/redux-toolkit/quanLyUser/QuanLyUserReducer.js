import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { QuanLiUserService } from "../../services/QuanLiUserService";
import { TOKEN, USER_lOGIN } from "../../utils/setting";

let user = ''
if(localStorage.getItem(USER_lOGIN)){
    user = JSON.parse(localStorage.getItem(USER_lOGIN))
}


export const { reducer: quanLiUserReducer, actions: QuanLiUserAction } =
  createSlice({
    name: "QuanLiUserReducer",
    initialState: {
      isPendingLogin: false, errLogin: "", userLogin: user,
      isPendingInfoUser: false, errInfoUser:'', infoUser: {}
    },
    reducers: {
      dangXuat: (state,action)=> {
        state.userLogin = ''
        localStorage.removeItem(USER_lOGIN)
        localStorage.removeItem(TOKEN)
      },
      resetErrLogin : (state,action)=> {
        state.errLogin = null
      }
    },
    extraReducers: (buider) => {
      buider
        // Login
        .addCase(login.pending, (state, action) => {
          state.isPendingLogin = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isPendingLogin = false;
          localStorage.setItem(USER_lOGIN, JSON.stringify(action.payload))
          localStorage.setItem(TOKEN, JSON.stringify(action.payload.accessToken))
          ;
          state.userLogin = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isPendingLogin = false;
          state.errLogin = action.payload;
        })

        // getInfoUser
        .addCase(getInfoUser.pending, (state,action)=> {
          state.isPendingInfoUser = true
        })
        .addCase(getInfoUser.fulfilled, (state,action)=> {
          state.isPendingInfoUser = false
          state.infoUser = action.payload
        })
        .addCase(getInfoUser, (state,action)=> {
          state.errInfoUser = action.payload
          state.isPendingInfoUser = false
        })

    },
  });

export const login = createAsyncThunk(
  "login", //taiKhoan, matKhau
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await QuanLiUserService.login(data);
    
      return res.data.content;

    } catch (err) {
      // console.log(err.response.data.content);
      return rejectWithValue(err.response.data.content);
    }
  }
);

export const getInfoUser = createAsyncThunk('getInfoUser', async(data)=> {
try{
  const res = await QuanLiUserService.getInfoUser(data)


  return res.data.content 
}catch(err){
  
  return err.response.data
}
})