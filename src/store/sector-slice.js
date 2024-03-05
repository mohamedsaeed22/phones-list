import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";
import { serializeError } from "serialize-error";

export const getAllSectors = createAsyncThunk(
  "sector/getAllSectors",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("api/Sector/GetAll");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeError(error.message));
    }
  }
);

export const addSector = createAsyncThunk(
  "sector/add",
  async (sectorName, thunkAPI) => {
    try {
      const response = await api.post("api/Sector/Create", {
        name: sectorName,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeError(error.message));
    }
  }
);

export const updateSector = createAsyncThunk(
  "sector/update",
  async (dep, thunkAPI) => {
    try {
      const response = await api.put(
        "reporting/authentication/generateToken",
        dep
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeError(error.message));
    }
  }
);

const initialState = {
  sectors: [],
  isLoading: false,
  error: null,
};

const sectorsList = (list) => {
  return list.map((option) => ({
    ...option,
    value: option.id,
    label: option.name,
  }));
};

const sectorSlice = createSlice({
  name: "sector",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all sectors
    builder
      .addCase(getAllSectors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSectors.fulfilled, (state, action) => {
        state.isLoading = true;
        state.sectors = sectorsList(action.payload.data);
      })
      .addCase(getAllSectors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = serializeError(action.payload);
      });

    // add sector
    builder
      .addCase(addSector.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSector.fulfilled, (state, action) => {
        state.isLoading = true;
        const myObj = action.payload.data;
        state.sectors.push({ ...myObj, value: myObj.id, label: myObj.name });
      })
      .addCase(addSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error = serializeError(action.payload);
      });
    // update sector
    builder
      .addCase(updateSector.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSector.fulfilled, (state, action) => {
        state.isLoading = true;
        console.log(action.payload);
      })
      .addCase(updateSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error = serializeError(action.payload);
      });
  },
});

export default sectorSlice.reducer;
