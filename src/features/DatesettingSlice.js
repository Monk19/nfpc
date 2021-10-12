import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  typeA: [],
  typeB: [],
};
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
      defectSettingHandler: (state, action) => {
      return {
        typeA: action.payload.typeA,
        typeB: action.payload.typeB,
      };
    },
  },
});

export const { defectSettingHandler } = dataSlice.actions;
export default dataSlice.reducer;
