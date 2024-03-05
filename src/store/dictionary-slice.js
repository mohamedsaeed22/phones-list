import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";

export const getAllData = createAsyncThunk(
  "dictionary/getAllData",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("GetAllDictionary");
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  data: [],
  depsInSector: [],
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    getDepartmentsInSector: (state, action) => {
      console.log(action.payload);
      console.log(state.data);
      const sector = state.data.find((s) => s.id === action.payload);
      if (!sector) {
        state.depsInSector = [];
      }
      state.depsInSector = sector.departments.map((option) => ({
        ...option,
        value: option.id,
        label: option.name,
      }));
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
        state.isLoading = true;
        state.data = action.payload.data;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { getDepartmentsInSector } = dictionarySlice.actions;

export default dictionarySlice.reducer;
