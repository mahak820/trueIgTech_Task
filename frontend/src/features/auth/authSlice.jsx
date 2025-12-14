import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authServices";
import { CloudFog } from "lucide-react";



const authSlice = createSlice({
    name : "auth",
    initialState : {
        user :JSON.parse(localStorage.getItem("user")) || null ,
        users : [],
    
        isLoading : false,
        isSuccess : false,
        isError : false ,
        message :""
    },
    reducers :{},
    extraReducers : builder =>{
        builder
        .addCase(registerUser.pending, (state,action) =>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
              } )
        .addCase(registerUser.fulfilled, (state,action) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
           state.users = [...state.users, action.payload]

              } )
        .addCase(registerUser.rejected, (state,action) =>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
              } )
              //LOGIN USER
              .addCase(loginUser.pending, (state,action) =>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
              } )
        .addCase(loginUser.fulfilled, (state,action) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
              } )
        .addCase(loginUser.rejected, (state,action) =>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
              } )
        //LOGOUT USER
        .addCase(logoutUser.fulfilled, (state) =>{
            state.user = null
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
              } )

    }
    
})

export default authSlice.reducer


// // register 
 export const registerUser = createAsyncThunk("REGISTER/USER" , async(formData,thunkAPI) =>{
    console.log(formData)
     try{
      return await authService.register(formData)
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})

// login
 export const loginUser = createAsyncThunk("LOGIN/USER" , async(formData,thunkAPI) =>{
    console.log(formData)
     try{
      return await authService.login(formData)
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})

 export const logoutUser = createAsyncThunk("LOGOUT/USER" , async(formData,thunkAPI) =>{
     try{
      return await authService.logout()
     } catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
     }
})
