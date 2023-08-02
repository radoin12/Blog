
import { PayloadAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { RootState } from "./config/store";
import axios from "axios";
import { PayloadData, PayloadDataUpdate } from "../../pages/client/writePage/Write";



export type PostType={
    id:number|any ,
    img?:string|undefined,
    description:string ,
    title:string,
    date:string ,
    cat:string,
    userId:number
   
}
export type PostUserType={
  id:number|null,
  name:string ,
  email:string
  image:string
  date:Date,
  post:{
    id:number ,
    img?:string|undefined,
    description:string ,
    title:string,
    date:string ,
    cat:string,
  }[]|[]
  
}|null
export type PostJoinUserType={
  id:number|any,
  name:string ,
  description:string ,
  title:string ,
  img?:string ,
  cat:string,
  email:string,
  date:string ,
  image?:string
}
type categorie=[{
  art: number
},
{
  cinema: number
},
{
  science: number
},
{
  Food: number
},
{
  design: number
},
{
  technology: number
}]|null

 export type initial_state={
    status:boolean|null,
    errorMsg:string|null ,
    post:PostType[],
    onePost:PostJoinUserType|null,
     countCat:categorie,
     searchVal:string|any,
     PostJoinUser: PostJoinUserType[],
     UserWithPosts:PostUserType
      StatepostUpdate:PayloadDataUpdate|null
}

              //  creation of posts
export const NewPostBlog=createAsyncThunk('post/NewPostBlog',async(payloadData:PayloadData,ThunkApi)=>{
  const{rejectWithValue}=ThunkApi

  try {
    const{data}=await axios.post('/api/post',payloadData) 
  console.log(data,"data user")
    return data 
  } catch (error:any) {
    console.log(error.response.data.message)
    return rejectWithValue(error?.response.data)
  }
})
//   display all posts
export const DisplayPost=createAsyncThunk('post/DisplayPost',async(val:any,ThunkApi)=>{
    const{rejectWithValue}=ThunkApi
   
 
    try {
      const{data}=await axios.get(`/api/all${val}`) 

    
      return data 
    } catch (error:any) {
      return rejectWithValue(error?.response.data)
    }
  })

  //   display all posts
export const DisplayPostsUsers=createAsyncThunk('post/DisplayPostsUsers',async(_,ThunkApi)=>{
  const{rejectWithValue}=ThunkApi
 

  try {
    const{data}=await axios.get(`/api/usersJoinPost`) 

  
    return data 
  } catch (error:any) {
    return rejectWithValue(error?.response.data)
  }
})






  // display  count for each Categories
  export const CountCategory=createAsyncThunk('post/CountCategory',async(_,ThunkApi)=>{
    const{rejectWithValue}=ThunkApi
   
 
    try {
      const{data}=await axios.get(`/api/count`) 

    
      return data?.fieldCounts 
    } catch (error:any) {
      return rejectWithValue(error?.response.data)
    }
  })
//  find one post 

export const FindOnePost=createAsyncThunk('post/FindOnePost',async(val:any|undefined,ThunkApi)=>{
  const{rejectWithValue}=ThunkApi


  try {
    const{data}=await axios.get(`/api/posts/users/${val}`) 
    console.log(data,"data now post id")
  
    return data 
  } catch (error:any) {
    const payloadError={
      message:error.response.data ,
      code:error.code
    }
    return rejectWithValue(payloadError)
  }
})
// find one user with Posts

export const OneUserWithPosts=createAsyncThunk('/',async(idVal:number|null,thunkApi)=>{
  const {rejectWithValue}=thunkApi
 try {
  const{data}=await axios.get(`/api/user/post/${idVal}`)
  console.log(data, 'test data')
  return data 
 } catch (error:any) {
  rejectWithValue(error.response.data)
 }
})


//  delete one post 

export const DeletePost=createAsyncThunk('post/DeletePost',async(val:number|string,ThunkApi)=>{
  const{rejectWithValue}=ThunkApi


  try {
    const{data}=await axios.delete(`/api/post/delete/${val}`) 
    console.log(data,"data give id")
  
    return data 
  } catch (error:any) {
    console.log(error)
    const payloadError={
      message:error.response.data ,
      code:error.code
    }
    return rejectWithValue(payloadError)
  }
})




// up date post
export const UpdatePostBlog=createAsyncThunk('post/UpdatePostBlog',async(payloadData: PayloadDataUpdate,ThunkApi)=>{
  const{rejectWithValue}=ThunkApi

  try {
    const{data}=await axios.put(`/api/posts/update/${payloadData.id}`,payloadData.Pro) 
  console.log(data,"data Updated")
    return data 
  } catch (error:any) {
    console.log(error.response.data)
    return rejectWithValue(error?.response.data)
  }
})

const initialState:initial_state={
    status:null,
    errorMsg:"",
    post:[],
    onePost:null,
    countCat:null,
    searchVal:'',
    PostJoinUser:[],
    UserWithPosts:null,
    StatepostUpdate:null
}


const postReducer=createSlice({
  name:"post" ,
  initialState,
  reducers:{
    saerchItem:(state,action)=>{
       state.searchVal=action.payload
    },
    getStateUpDate:(state,action)=>{
         state.StatepostUpdate=action.payload
    }
  },
  extraReducers:builder=>{
  builder.addCase(NewPostBlog.pending,(state)=>{
    state.status=true
  })
  .addCase(NewPostBlog.fulfilled,(state,action)=>{
      state.status=false
      console.log(typeof(action.payload),"type")
       if (action.payload&&typeof(action.payload)==="string") {
        state.errorMsg=action.payload
      
       }
      
      else{
        state.errorMsg = null;
          state.post = state.post ? [...state.post, action.payload] : [action.payload];
        
      } 
      
  
  })
  .addCase(NewPostBlog.rejected,(state,action:PayloadAction<any>)=>{
 

       state.status=false
        if(action.payload.message) {
          state.searchVal=action.payload.message
          state.errorMsg=null
        }
        else{
          state.searchVal=null 
        }
          
       
    
  })

//   display AllPosts
.addCase(DisplayPost.pending,(state)=>{
    state.status=true
  })
  .addCase(DisplayPost.fulfilled,(state,action)=>{
 
   
        return{
            ...state,status:false,
            post:action.payload
           
        }  
    
    
  
  })
  .addCase(DisplayPost.rejected,(state,action:PayloadAction<any>)=>{
  return{
    ...state, status:false,
    errorMsg:action.payload
  }
  })
  // display users Joins Posts
  .addCase(DisplayPostsUsers.pending,(state)=>{
    state.status=true
  })
  .addCase(DisplayPostsUsers.fulfilled,(state,action)=>{
 
   
        return{
            ...state,status:false,
            PostJoinUser:action.payload
           
        }  
    
    
  
  })
  .addCase(DisplayPostsUsers.rejected,(state,action:PayloadAction<any>)=>{
  return{
    ...state, status:false,
    errorMsg:action.payload
  }
  })

   // count Category
   .addCase(CountCategory.pending,(state)=>{
    state.status=true
  })
  .addCase(CountCategory.fulfilled,(state,action)=>{
 
   
        return{
            ...state,status:false,
            countCat:action.payload
           
        }  
    
    
  
  })
  .addCase(CountCategory.rejected,(state,action:PayloadAction<any>)=>{
  return{
    ...state, status:false,
    errorMsg:action.payload
  }
  })

//   find one Post
.addCase(FindOnePost.pending,(state)=>{
  state.status=true
})
.addCase(FindOnePost.fulfilled,(state,action)=>{

 
      return{
          ...state,status:false,
              onePost:action.payload
         
      }  
  
  

})
.addCase(FindOnePost.rejected,(state,action:PayloadAction<any>)=>{
return{
  ...state, status:false,
  errorMsg:action.payload.message
}
})
// find one user with posts

.addCase(OneUserWithPosts.pending,(state)=>{
  state.status=true
})
.addCase(OneUserWithPosts.fulfilled,(state,action)=>{
    console.log(action.payload,"hatha")
 
      return{
          ...state,status:false,
          UserWithPosts:action.payload
         
      }  
  
  

})
.addCase(OneUserWithPosts.rejected,(state,action:PayloadAction<any>)=>{
return{
  ...state, status:false,
  errorMsg:action.payload
}
})
// Delete Post 

.addCase(DeletePost.pending,(state)=>{
  state.status=true
})
.addCase(DeletePost.fulfilled,(state,action)=>{
    console.log(action.payload,"action")
 
    state.status=false
    state.PostJoinUser=state?.PostJoinUser.filter((post)=>post.id!==action.payload) 
   
  
  
  

})
.addCase(DeletePost.rejected,(state,action:PayloadAction<any>)=>{
return{
  ...state, status:false,
  errorMsg:action.payload.message
}
})




// update post
.addCase(UpdatePostBlog.pending,(state)=>{
  state.status=true
})
.addCase(UpdatePostBlog.fulfilled,(state,action)=>{
  let upDatePostes : any=state.post?.map((po:PostType)=>
      
  po.id===state.StatepostUpdate?.id?state.StatepostUpdate?.Pro:po

)

let updatePostJoinUser:any=state.PostJoinUser.map((post)=>
post.id===state.StatepostUpdate?.id?
{...state.StatepostUpdate?.Pro,id:post.id,date:post.date,image:post.image,name:post.name}

:post

)

state.post=upDatePostes
state.PostJoinUser=updatePostJoinUser
    state.status=false
     if (typeof(action.payload)==="string") {
      state.errorMsg=action.payload
      
     }
    else{
     
      state.errorMsg = null;
      
    } 
    

})
.addCase(UpdatePostBlog.rejected,(state,action:PayloadAction<any>)=>{

  return{
      ...state,status:false,
      errorMsg:action.payload
    
     
  } 
})





  }
})





export default postReducer.reducer

export const  postState=(state:RootState)=>state.post
export const{saerchItem,getStateUpDate}=postReducer.actions