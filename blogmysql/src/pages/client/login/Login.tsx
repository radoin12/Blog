import React, { useEffect } from 'react';
import "../../style.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { LoginApp, authState, reload } from '../../../component/redux/auth';
import { userInfo } from 'os';
export type userLogin={
  
  email?:string |undefined,
  password?:string |undefined
 }
export default function Login() {
  const dispatch=DispatchApp()
  const navigate=useNavigate()
  const CheckAuth=SelectorApp(authState)
  console.log(CheckAuth.errorMsg, ' data')
  
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<userLogin>({
    mode: "all"
  })
   const handlSubmit=handleSubmit((data)=>{
                   
          dispatch(LoginApp(data))
        
       
   })
   useEffect(() => {
    if (CheckAuth.userInfo.id) {
    navigate('/')
    reset()
    }
    if (CheckAuth.userInfo.id&&CheckAuth.userInfo.isAdmin) {
      navigate('/admin')
    }

   }, [CheckAuth.userInfo.id,dispatch,reset,CheckAuth.userInfo.isAdmin]);

  return (
    <div className='beauty'>
      <div className='auth' >
          <h2>Login</h2>
      <form onSubmit={handlSubmit}>
      
        <input {...register("email",{
           required:"email is required",
           pattern:{
               value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               message:'email must be a valid'
           }
        })} type='email'  placeholder='write your email'/>
        { errors?.email&&<p className='errorText'data-testid="error" style={{visibility:errors.email?"visible":"hidden"}}>{errors.email?.message}</p>}
        <input type='password' {...register("password",{
           required:"password is required"
        })}placeholder='write your passord' />
        { errors?.password&&<p className='errorText'data-testid="error" style={{visibility:errors.password?"visible":"hidden"}}>{errors.password?.message}</p>}
        {CheckAuth.errorMsg&&!errors?.password&&!errors?.email&&<p className='errorText'>{CheckAuth.errorMsg}</p>}
        <button>Login</button>
        <span>you d'ont have an account yet?</span>
        <Link to="/Register">Register</Link>
      </form>
    </div>
    </div>
  );
}
