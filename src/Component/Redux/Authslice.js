import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Redux/Helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const initialState = {
  des: [],
  isloggedIn: false,
  redirectTo: null,
  redirectTooo:null,
  redirectToList:null,
  data: [{}],
};


export const register = createAsyncThunk(
  "user/signup",

  async (formData) => {
    let res = await axiosInstance.post(`user/signup`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const login = createAsyncThunk(
  "user/signin",

  async (formData) => {
    let res = await axiosInstance.post(`user/signin`, formData);

    let resData = res?.data;

    return resData;
  }
);
export const create = createAsyncThunk(
  "product/create",
  async (formData) => {
    let res = await axiosInstance.post('product/create', formData);
    let resData = res?.data;
    return resData;

  }

)
export const Display = createAsyncThunk(
  "product/list",
  async () => {

    let res = await axiosInstance.post(`product/list`);
    let resData = res?.data;
    return resData;
  }
)
export const AuthSlice = createSlice({
  name: "registration",
  initialState,

  reducers: {
    reset_redirectTo: (state, { payload }) => {
      state.redirectTo = payload;

    },
    reset_redirectTooo: (state, { payload }) => {
      state.redirectTooo = payload;

    },
    reset_redirectproduct: (state, { payload }) => {
      state.redirectToList = payload;

    },
    newproduct:(state,{payload})=>{
      localStorage.removeItem("title");
    },
    reset_register:(state,{payload})=>{
      localStorage.removeItem("email")
    },

    handlelogout: (state, { payload }) => {
      localStorage.removeItem('token')
      state.isloggedIn = false
      toast("Logout Succesfully")
    },

    check_token: (state, { payload }) => {
      localStorage.getItem('token')
      state.isloggedIn = true
    },
  },

  extraReducers: (builder) => {
    builder
      //   .addCase(getHomeData.pending, (state, payload) => {
      //     state.status = "loading";
      //   })
      //   .addCase(getHomeData.fulfilled, (state, { payload }) => {
      //     state.status = "idle";

      //     if (payload?.ststus == "success") {
      //       state.des = payload?.data;
      //     }
      //   })
      //   .addCase(getHomeData.rejected, (state, payload) => {
      //     state.status = "idle";
      //   })

      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload?.status=== 200) {
          state.isloggedIn = true
          
          localStorage.setItem("email",payload?.data.email)
          state.redirectTooo="/Login";
          toast(payload.message)
       
        }
        else if(payload?.status===201){
          toast(payload.message)
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(login.pending, (state, action) => {
        state.login_status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.isloggedIn = true
          localStorage.setItem("token", payload?.token);
          state.redirectTo = "/ProductList";
          toast(payload.message)
        }else if(payload.status===201) {
          toast(payload.message)
        }


      })
      .addCase(login.rejected, (state, action) => {
        state.login_status = "idle";
        console.log("kjjhj", state.login_status);
      })
      .addCase(create.pending, (state, action) => {
        state.status = "Loding..";
      })
      .addCase(create.fulfilled, (state, {payload}) => {
        state.status = "idle"
        if(payload?.status===200){
          localStorage.setItem("title",payload?.data.title)
          state.redirectToList="/ProductList"
          toast(payload?.message)
        }

      })
      .addCase(create.rejected, (state, action) => {
        state.status = "idle"

      })

      .addCase(Display.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(Display.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = payload.data;
      })
      .addCase(Display.rejected, (state, action) => {
        state.status = "idle";
      })
  },
});

export const { reset_redirectTo,reset_redirectTooo,reset_redirectproduct,check_token,reset_register ,handlelogout,newproduct } = AuthSlice.actions;
