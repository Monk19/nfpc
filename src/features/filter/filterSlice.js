import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    fromDate:"",
    toDate:"",
    type1:"",
    type2:"",
    Scratch:"",
    Discoloration:"",
    ForeignParticle:"",
    All:""
}
export const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
        filterHandler:(state,action)=>{
            console.log(state)
            return{
            ...action.filtervalues
        }
        }
    }
})
export const {filterHandler} = filterSlice.actions

export default filterSlice.reducer