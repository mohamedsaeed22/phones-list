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

export const deleteOffice = createAsyncThunk(
  "office/deleteOffice",
  async (id, thunkAPI) => {
    try {
      const response = await api.post("api/Office/Delete?id=" + id);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateOffice = createAsyncThunk(
  "office/updateOffice",
  async (office, thunkAPI) => {
    console.log(office)
    try {
      const response = await api.post(
        "api/Office/Update?id=" + office.id,
        office
      );
      console.log(response)
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
        state.offices.push(action.payload.data);
      })
      .addCase(addOffice.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action)
        state.error = action.payload;
      });

    builder
      .addCase(updateOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOffice.fulfilled, (state, action) => {
        state.isLoading = true;
        state.offices.push(action.payload.data);
      })
      .addCase(updateOffice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOffice.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOffice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default officeSlice.reducer;
