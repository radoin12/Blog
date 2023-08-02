
import{PayloadAction, createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { RootState } from "./config/store";
import axios from "axios";
import { userRegister } from "../../pages/client/register/Register";
import { userLogin } from "../../pages/client/login/Login";
import jwtDecode from 'jwt-decode'

import { upDateUser } from "./user";



export type RegisterUserType={
    id:number,
    name:string ,
    email:string,
    password:string,
    image:string,
    date:Date
}
export type TokenType={
    id?:number,
    name?:string ,
    email?:string,
    isAdmin:Boolean|null
  
}
interface initialType{
    status:boolean |null;
    errorMsg:string|null ;
    users:RegisterUserType[]|null,
   
    userInfo:TokenType

}
const initial_state:initialType={
   status:null ,
   errorMsg:null,
   users:null,
   userInfo:{
    id:0,
    name:"" ,
    email:"",
    isAdmin:null
   } 

}
export const RegisterApp=createAsyncThunk('auth/RegisterApp',async(payloadAuth:userRegister,ThunkApi)=>{
   const{rejectWithValue}=ThunkApi
    try {
        const{data}=await axios.post('/api/auth/register',payloadAuth) 
        ThunkApi.dispatch(upDateUser(data));
        return data
    } catch (error:any) {
      console.log(error,"error catch")
    
      return rejectWithValue(error.response.data);
    }
})
          // login page

          export const LoginApp=createAsyncThunk('auth/LoginApp',async(payloadAuth:userLogin,ThunkApi)=>{
            const{rejectWithValue}=ThunkApi
             try {
                 const{data}=await axios.post('/api/auth/login',payloadAuth,{withCredentials:true}) 
             
                 localStorage.setItem('userToken',JSON.stringify(data?.accessToken))
                 return data.accessToken
             } catch (error:any) {
                
              const errorPayload = {
                message: error.response.data,
                code: error.code,
              };
              return rejectWithValue(errorPayload);
             }
         })
       
const authReducer=createSlice({
    name:"auth",
    initialState:initial_state,
    reducers:{
        reload:(state)=>{
            if (JSON.parse(localStorage.getItem('userToken')as string)) {
              const jwt:TokenType=jwtDecode(JSON.parse(localStorage.getItem('userToken')as string))
              state.userInfo.id=jwt?.id 
              state.userInfo.name=jwt?.name
              state.userInfo.email=jwt?.email
              state.userInfo.isAdmin=jwt.isAdmin
            }
              
           },
           logoutUser:(state)=>{
            state.userInfo.id=undefined
           }
    },
    extraReducers:builder=>{
       builder.addCase(RegisterApp.pending,(state)=>{
           return{
            ...state,status:true
           }
       })
       .addCase(RegisterApp.fulfilled,(state,action:any)=>{
         state.status=false 
         if(typeof(action.payload)==="string"){
          console.log(action.payload ,"action")
           state.errorMsg=action.payload
         }
         else {
          state.errorMsg = null;
          
          state.users = state.users ? [...state.users, action.payload] : [action.payload];
        }
         
       
       
       
       })
       .addCase( RegisterApp.rejected,(state,action:any)=>{
        state.status = false;
        state.errorMsg = action.payload;
       })
        // login

    .addCase(LoginApp.pending,(state)=>{
        state.status=true
     })
     .addCase(LoginApp.fulfilled,(state,action:PayloadAction<any>)=>{
         state.status=false
         if (action.payload) {
          const decodeToken:TokenType=jwtDecode((JSON.parse(localStorage.getItem('userToken')as string)))
          
            state.userInfo.id=decodeToken.id
            state.userInfo.name=decodeToken.name
            state.userInfo.email=decodeToken.email
            state.userInfo.isAdmin=decodeToken.isAdmin
        
         }
        
             
         
     })
     .addCase(LoginApp.rejected,(state,action:PayloadAction<any>)=>{
       state.status=false
       console.log(action.payload)
       state.errorMsg=action.payload.message
     })
   
    }
    

})
export default authReducer.reducer
export const authState=(state:RootState)=>state.auth
export const {reload,logoutUser}=authReducer.actions