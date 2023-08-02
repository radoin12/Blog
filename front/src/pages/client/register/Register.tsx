import React, { useEffect } from 'react';
import "../../style.scss"
import{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './register.css'
import { RegisterApp, authState} from '../../../component/redux/auth';
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { UserState, findAllUsers } from '../../../component/redux/user';
import { useForm } from "react-hook-form"
import axios from 'axios';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

 export type userRegister={
  name?:string |undefined,
  email?:string |undefined,
  password?:string |undefined
 

 }
export default function Register() {

  const[file,setFile]=useState<any|null>(null)
  const userInfo=SelectorApp(authState)
  console.log(userInfo.errorMsg,"error msg")
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state to track registration success
  const Dispatch=DispatchApp()
 const navigate=useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<userRegister>({
    mode: "all"
  })







   useEffect(()=>{
        Dispatch(findAllUsers())
   },[Dispatch])
   

  const handlSubmit=handleSubmit(async(data) => {
    
    const imgUrl=await upload()
    const RegisterData={...data,image:file?imgUrl:"https://img.freepik.com/icones-gratuites/utilisateur_318-159711.jpg"}

    Dispatch(RegisterApp(RegisterData))
   
   
   
 
  })
  const handlChangeFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    setFile(e.target?.files&&e.target?.files[0] )
  }
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const { data } = await axios.post('/api/upload', formData);
      console.log(data,"data img")
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userInfo.status && userInfo.users && userInfo.users.length > 0) {
      reset();
      setRegistrationSuccess(true);
      // Set registration success status to true
    }
  }, [userInfo.status, userInfo.users, reset]);

  const handleRegisterAgain = () => {
    setRegistrationSuccess(false); // Reset registration success status to allow seeing the form again
  };
 console.log(userInfo.users,"users")
return (
    <div className='auth'>
      {
        registrationSuccess&&!userInfo.errorMsg?(
          <>
          <h2>Registration Successful!</h2>
          <p>You have successfully registered.</p>
          <button className='buttonSuccesRegester' onClick={handleRegisterAgain}>Register Again</button>
          <span>Already have an account?</span>
          <Link to="/login" className='loginPage'>Login</Link>
          </>
        ):
        (
          <>
              <h2>Register</h2>
<form  onSubmit={handlSubmit}>


     <input   style={{display:"none"}}type='file' id="file"  onChange={handlChangeFile}/>
      <label className='file' htmlFor='file' > 
         <DriveFolderUploadIcon/>
         <p className='uploadImage'> Upload Image</p>
       </label>

   <input {...register("name",{
        required:"name is required",
        minLength:{
            value:3,
            message:'name must be more than 3 caracters'
        },
        maxLength:{
            value:20,
            message:"must have less than 20 caracters"
        }
       })} type='text'  placeholder='write your Name'/>
 { errors?.name&&<p className='errorText'data-testid="error" style={{visibility:errors.name?"visible":"hidden"}}>{errors.name?.message}</p>}
   <input {...register("email",{
        required:"email is required",
        pattern:{
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message:'email must be a valid'
        }
      })}  type='email'  placeholder='write your email'/>
       { errors?.email&&<p className='errorText'data-testid="error" style={{visibility:errors.email?"visible":"hidden"}}>{errors.email?.message}</p>}
   <input  {...register("password",{
    required:"password is required"
   })} type='password' placeholder='write your passord'  />
   { errors?.password&&<p className='errorText'data-testid="error" style={{visibility:errors.password?"visible":"hidden"}}>{errors.password?.message}</p>}
   {(userInfo?.errorMsg)&& <p className='errorText' >{userInfo?.errorMsg}</p>}

   <button type='submit' >Register</button>
   <span>you  have an account ?</span>
    <Link to="/Login">Login</Link>
</form>
          </>
        )
      }
</div>
  );
}
