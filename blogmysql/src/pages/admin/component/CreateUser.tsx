import React, { ReactNode } from 'react';
import Sidebar from '../../../component/sidebar';
import "./create.scss"
import { ToastContainer, toast } from 'react-toastify';
 import{useForm} from "react-hook-form"
 import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
 import{Button, TextField, colors} from '@mui/material'
 import{useState,useEffect} from "react"
import { userRegister } from '../../client/register/Register';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router';
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { RegisterApp, authState } from '../../../component/redux/auth';
import { UpdateUserBlog, UserState } from '../../../component/redux/user';



 export type payloadUpdateUser={
  name?:string,
  email?:string,
  image?:string,
  id:number
}

export default function Createuser() {
  const location=useLocation()?.state
    const[file,setFile]=useState<any>(`${location?.image}`||"")
   
    const userInfo=SelectorApp(authState)
    const userInfo1=SelectorApp(UserState)
    console.log(userInfo1.users,"up date user info ")
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  

    const navigate=useNavigate()
    const dispatch=DispatchApp()
 
  
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm<userRegister>({
        mode: "all",
         defaultValues:{
             name:location?.name || '',
             email:location?.email|| ''
      
         }
      })
    
    // handlChange File
    const handlChangeFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setFile(e.target?.files&&e.target?.files[0] )
      }
      const upload = async () => {
        try {
          const formData = new FormData();
          formData.append('file', file);
       
          const { data } = await axios.post('/api/upload', formData);
          
          return data;
        } catch (error) {
          console.log(error)
        }
      };
  //    form submit
  const FormSubmit=handleSubmit(async(data)=>{
   
   const imgUrl=await upload()
  
   
      
     
   const RegisterData={...data,image:file&&imgUrl||"https://img.freepik.com/icones-gratuites/utilisateur_318-159711.jpg"}
   setIsFormSubmitted(true);
   if (location) {
    const {password,image,...other}=RegisterData
    const  upDateUser:payloadUpdateUser={...other,id:location.id,image:imgUrl||file}
  
       dispatch(UpdateUserBlog(upDateUser))
  
    }
    else{
    
      dispatch(RegisterApp(RegisterData))
    }
    
   
    
  })
  useEffect(() => {
    if (isFormSubmitted && !userInfo.status && !userInfo.errorMsg) {
      reset();
     navigate('/admin/users')
    }
  }, [isFormSubmitted, userInfo.status, userInfo.errorMsg, reset]);

  return (
    <div className='create'>
      <Sidebar/>
      <div className='containerUser'>
         <form  className='mainForm' onSubmit={FormSubmit} >
          <div className='FormConatainer'>
          <TextField
          {...register("name",{
            required:"name is empty",
            minLength:{
                value:3,
                message:"name must be more than 3 letters"
            }
          })}
          className='field' type='text' label="name" variant='standard' 
           helperText={errors.name?errors.name.message:""}
           inputProps={{
            'data-testid': 'error'
          }}
           FormHelperTextProps={{
            style: {
              color: 'red'
            },
          }}
           color={!errors.name?"primary":"error"}
          />
           <input type="file" id="file" style={{display:"none"}} onChange={handlChangeFile}/>
           <label  htmlFor='file' className='fileImg'>
           <DownloadForOfflineIcon/>
           <p className='upload'>{file?file.name:"Upload Image"}</p>
            
           </label>
           <div className='email'>
           <TextField
            {...register("email",{
                required:"email is empty",
                pattern:{
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                     message:'email must be a valid'
                }
            })}
           className='field'    type='email' label="email" variant='standard'
            helperText={errors.email?errors.email.message:""}
            inputProps={{
                'data-testid': 'error'
              }}
            FormHelperTextProps={{
                style:{
                    color:'red',
                    
                }
               
               
            }}
          
          
            color={errors.email?"error":"primary"}
           />
           {(userInfo?.errorMsg&&!userInfo.status)&& <p className='errorText' >{userInfo?.errorMsg}</p>}
           </div>
        {  !location&& <TextField
           {...register("password",{
            required:"password is empty",
            minLength:{
                value:5,
                message:"password should have more than 4 letters"
            }
           })}
           className='field' label="password" variant='standard'
           inputProps={{
            'data-testid': 'error'
          }}
           helperText={errors.password?errors.password.message:""}
           FormHelperTextProps={{
            style:{
                color:'red'
            }
           }}
           color={errors.password?"error":"primary"}
           />}
          </div>
          
           <Button type='submit' className='button' variant='contained' color='success'>{location?"up date":"create"}</Button>
         </form>
      </div>
    </div>
  );
}
