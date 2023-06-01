import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Redux/Helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
  upload_status: "idle",
  data:[{}],
  id:[{}]
};
export const Edit= createAsyncThunk(

    "product/detail/",
    async (id) => {
        let res = await axiosInstance.get(`product/detail/${id}`);
    
        let resData = res?.data;
    
        return resData;
      }
)
export const io=createAsyncThunk(
    "product/update",
    async(formData)=>{
      let res = await axiosInstance.post('product/update',formData);
      let resData=res?.data;
      return resData;
  
    }
  
  )
  export const del=createAsyncThunk(

    "product/remove",
    async(id)=>{
        let res=await axiosInstance.post(`product/remove`,id);
        let resData=res?.data;
        return resData;
    }
  )
export const Crudslice=createSlice({
name:"Entry",
initialState,

    extraReducers:(builder)=>{

        builder

        .addCase(Edit.pending,(state,paylod)=>{
            state.status="idle"
        })
        .addCase(Edit.fulfilled,(state,{payload})=>{
            state.status="idle";
            if(payload?.status===200){
                state.data=payload.data;
                toast(payload?.message)
            }
        })
        .addCase(Edit.rejected,(state,paylod)=>{
            state.status="idle"
        })

        .addCase(io.pending,(state,payload)=>{

            state.status="idle";
        })
        .addCase(io.fulfilled,(state,{payload})=>{
            state.status="idle";
            if(payload?.status===200){
                toast(payload?.message)
            }
            
            
        })
        .addCase(io.rejected,(state,payload)=>{
            state.status="idle";
        })

        .addCase(del.pending,(state,payload)=>{
            state.status="Loading";
            state.delete_status="false";
        })
        .addCase(del.fulfilled,(state,{payload})=>{
            state.status="idle";
           if(payload.status===200){
            state.delete_status="true";
            toast(payload?.message)
           }
        })
        .addCase(del.rejected,(state,payload)=>{
            state.status="idle";
            state.delete_status="false";
        })

    }
})