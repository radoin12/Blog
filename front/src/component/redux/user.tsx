
import{PayloadAction, createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { RootState } from "./config/store";
import axios from "axios";
import { payloadUpdateUser } from "../../pages/admin/component/CreateUser";


export type RegisterUserType={
    id:number|null,
    name:string ,
    email:string
    image:string
    date:Date
}
interface initialType{
    status:boolean |null;
    errorMsg:string ;
    users:RegisterUserType[],
    oneUser:RegisterUserType|null,
    id:number|null

}
const initial_state:initialType={
   status:null ,
   errorMsg:"",
   users:[],
   oneUser:null,
   id:null
}
export const findAllUsers=createAsyncThunk('user/findAllUsers',async()=>{
  
    try {
        const{data}=await axios.get('/user') 
     
        return data
    } catch (error) {
      console.log(error)  
    }
})
//  find only one user 
export const findOneUser=createAsyncThunk('user/findOneUser',async(val:number|null,thunkApi)=>{
const {rejectWithValue}=thunkApi
try {
  const {data}=await axios.get(`/api/user/${val}`)  
  return data
} catch (error:any) {
   return rejectWithValue(error.response.data) 
}
})
// up date user
export const UpdateUserBlog=createAsyncThunk('user/UpdatePostBlog',async(payloadData:payloadUpdateUser,ThunkApi)=>{
    const{rejectWithValue}=ThunkApi
  
    try {
      const{data}=await axios.put(`/api/user/update/${payloadData.id}`,payloadData) 
    console.log(data,"data Updated")
      return data 
    } catch (error:any) {
      console.log(error,'error up date')
      return rejectWithValue(error?.response.data)
    }
  })

// delete user
export const DeleteUser=createAsyncThunk('user/DeleteUser',async(val:number|null,thunkApi)=>{
    const {rejectWithValue}=thunkApi
    try {
      const {data}=await axios.delete(`/api/user/delete/${val}`)  
      return data
    } catch (error:any) {
       return rejectWithValue(error.response.data) 
    }
    })


const userReducer=createSlice({
    name:"user",
    initialState:initial_state,
    reducers:{
        getIdUser:(state,action:PayloadAction<number>)=>{
            state.id=action.payload
        },
        upDateUser:(state,action)=>{
          
           state.users.push(action.payload)
        }
    },
    extraReducers:builder=>{
       builder.addCase(findAllUsers.pending,(state)=>{
           return{
            ...state,status:true
           }
       })
       builder.addCase(findAllUsers.fulfilled,(state,action:any)=>{
         state.status=false ;
        state.users=action.payload
       })
       builder.addCase( findAllUsers.rejected,(state,action:PayloadAction<any>)=>{
        return{
            ...state,status:false,
            errorMsg:action.payload
        }
       })
    //    find one user
    .addCase(findOneUser.pending,(state)=>{
        return{
         ...state,status:true
        }
    })
    .addCase(findOneUser.fulfilled,(state,action:any)=>{
      state.status=false ;
     state.oneUser=action.payload
    })
    .addCase( findOneUser.rejected,(state,action:PayloadAction<any>)=>{
     return{
         ...state,status:false,
         errorMsg:action.payload
    
     }
    })

  //    Delete one user
  .addCase(DeleteUser.pending,(state)=>{
    return{
     ...state,status:true
    }
})
.addCase(DeleteUser.fulfilled,(state,action:any)=>{
    console.log(state.id,"id")
  state.status=false ;
   state.users=state.users.filter((user)=>user.id!==state.id)
})
.addCase( DeleteUser.rejected,(state,action:PayloadAction<any>)=>{
 return{
     ...state,status:false,
     errorMsg:action.payload

 }
})
// up date user

.addCase(UpdateUserBlog.pending,(state)=>{
    return{
     ...state,status:true
    }
})
.addCase(UpdateUserBlog.fulfilled,(state,action:any)=>{
    
  state.status=false ;
  const updateUser=state.users.map((user)=>
   user.id===action.payload.id?action.payload:user
   )
   state.users=updateUser
})

.addCase(UpdateUserBlog.rejected,(state,action:PayloadAction<any>)=>{
 return{
     ...state,status:false,
     errorMsg:action.payload

 }
})

    }
    

})
export default userReducer.reducer
export const UserState=(state:RootState)=>state.user 
export const{getIdUser,upDateUser}=userReducer.actions