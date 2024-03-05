import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import departementReducer from "./departement-slice";
import sectorReducer from "./sector-slice";
import dictionaryReducer from "./dictionary-slice";
import officeReducer from "./office-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    departement: departementReducer,
    sector: sectorReducer,
    data: dictionaryReducer,
    office: officeReducer,
  },
});

export default store;
