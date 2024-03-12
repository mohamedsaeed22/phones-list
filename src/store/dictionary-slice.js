import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";

export const getAllData = createAsyncThunk(
  "dictionary/getAllData",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("GetAllDictionary");
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    pushOffice: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.data.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // get all data
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { pushOffice, checkNumber } = dictionarySlice.actions;

export default dictionarySlice.reducer;
