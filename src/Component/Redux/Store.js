
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./Authslice";
import { Crudslice } from "./Crudslice";
export const Store = configureStore({
  reducer: {
    // loged: loginSlice.reducer,
    contents:AuthSlice.reducer,
    crud:Crudslice.reducer,
    

   
  },

});