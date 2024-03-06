import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";

export const addDepartement = createAsyncThunk(
  "departement/add",
  async (dep, thunkAPI) => {
    try {
      const response = await api.post(
        "api/Department/Create",
        dep
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const getAllDepartements = createAsyncThunk(
  "departement/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("api/Department/GetAll");
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateDepartement = createAsyncThunk(
  "departement/update",
  async (dep, thunkAPI) => {
    try {
      const response = await api.put(
        "api/Department/Update",
        dep
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const departementsList = (list) => {
  return list?.map((option) => ({
    ...option,
    value: option.id,
    label: option.name,
  }));
};

const initialState = {
  departements: [],
  isLoading: false,
  error: null,
};

const departementSlice = createSlice({
  name: "departement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all departement
    builder
      .addCase(getAllDepartements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllDepartements.fulfilled, (state, action) => {
        state.isLoading = true;
        state.departements = departementsList(action.payload.data);
      })
      .addCase(getAllDepartements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // add departement
    builder
      .addCase(addDepartement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDepartement.fulfilled, (state, action) => {
        state.isLoading = true;
        const myObj = action.payload.data;
        state.departements.push({
          ...myObj,
          value: myObj.id,
          label: myObj.name,
        });
      })
      .addCase(addDepartement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update departement
    builder
      .addCase(updateDepartement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDepartement.fulfilled, (state, action) => {
        state.isLoading = true;
        console.log(action.payload);
      })
      .addCase(updateDepartement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default departementSlice.reducer;
