import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fromDate: "",
  toDate: "",
  type1: "",
  type2: "",
  Scratch: "",
  Discoloration: "",
  ForeignParticle: "",
  All: "",
};
export const filterSlice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    filterHandler: (state, action) => {
      console.log(action.payload);
      return { ...action.payload };
    },
  },
});
export const { filterHandler } = filterSlice.actions;

export default filterSlice.reducer;
