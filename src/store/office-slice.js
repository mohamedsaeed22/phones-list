import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";

export const addOffice = createAsyncThunk(
  "office/getAllOfficess",
  async (office, thunkAPI) => {
    try {
      const response = await api.post("api/Office/Create", office);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  offices: [],
  isLoading: false,
  error: null,
};

const officeSlice = createSlice({
  name: "office",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add office
    builder
      .addCase(addOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOffice.fulfilled, (state, action) => {
        state.isLoading = true;
        console.log(action.payload.data)
        state.offices.push(action.payload.data);
      })
      .addCase(addOffice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export default officeSlice.reducer;
