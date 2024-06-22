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
  async (sector, thunkAPI) => {
    try {
      const response = await api.post("api/Sector/Create", {
        index: sector.index,
        name: sector.name,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeError(error.message));
    }
  }
);
export const deleteSector = createAsyncThunk(
  "sector/delete",
  async (sectorId, thunkAPI) => {
    try {
      const response = await api.post("api/Sector/Delete?id=" + sectorId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeError(error.message));
    }
  }
);

export const updateSector = createAsyncThunk(
  "sector/update",
  async (sector, thunkAPI) => {
    console.log(sector)
    try {
      const response = await api.post("api/Sector/Update?id=" + sector.id, {
        index: sector.index,
        name: sector.name,
      });
      return response.data;
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
      })
      .addCase(updateSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error = serializeError(action.payload);
      });
    // update sector
    builder
      .addCase(deleteSector.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSector.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error = serializeError(action.payload);
      });
  },
});

export default sectorSlice.reducer;
