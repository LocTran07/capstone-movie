import { createSlice } from "@reduxjs/toolkit";

export const { reducer: loadingReducer, actions: loadingAction } = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    removeLoading: (state, action) => {
        state.loading = false
    },
  },
});
