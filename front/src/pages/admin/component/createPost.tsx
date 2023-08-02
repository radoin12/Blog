import React from 'react';
import Sidebar from '../../../component/sidebar';
import "./create.scss"
import{Autocomplete, FormControl, FormLabel, MenuItem, TextField,Button} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import{useState,useEffect} from "react"
import convertTo64Bit from '../../client/writePage/convertTo6s';
import axios from 'axios';
import { useForm,Controller } from 'react-hook-form';
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { NewPostBlog, UpdatePostBlog, getStateUpDate, postState } from '../../../component/redux/post';
import { useLocation, useNavigate } from 'react-router';
import { PayloadDataUpdate } from '../../client/writePage/Write';
import { ToastContainer, toast } from 'react-toastify';

  type CatType=string[]
  type PostType={
    title:string ,
    description:string ,
    cat:string
  }
export default function CreatePost() {

    const val=useLocation()?.state
    
    const location=val?.post
       const id=val?.id
     
    const[text,setText]=useState<string>(location?.description||'')
    const[file,setFile]=useState<any|null>(`${location?.img}`||null)
  

    const[fileImg,setFileImg]=useState<{img:any}>({img:''})
    const [imageError, setImageError] = useState<string | null>(null);
    const dispatch=DispatchApp()
    const navigate=useNavigate()
    const infoPost=SelectorApp(postState)
    const OptionCategory:CatType=["art","Food","science","cinema","design","technology"]
    const[validSubmit,setValidSubmit]=useState<boolean>(false)
    const {
        register,
        setValue,
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm<PostType>({
        mode: "all",
        defaultValues: {
            title:location?.title || '',
            description:location?.description || '',
            cat: location?.cat || ''// Set the default value here using location?.cat
          },
      })
    //  File Image
    const handlChangeFile=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setFile(e.target?.files&&e.target?.files[0] )
        const convertImg=await convertTo64Bit(e.target.files&&e.target?.files[0])
      
        setFileImg({...fileImg,img:convertImg})
      }
    //   uploadImage
    useEffect(()=>{
      setFileImg({...fileImg,img:location?.img})
    },[location])
    const upload = async () => {
      
        try {
          const formData = new FormData();
          formData.append('file', file);
      
          const { data } = await axios.post('/api/upload', formData);
          
     
        
          return data;
        } catch (error) {
           
        }
      };
    //   clickHandler
   
    const handlSubmit=handleSubmit(async(data) => {
        
        const imgUrl=await upload()
      
        const RegisterData={...data,img:file&&imgUrl||file}
      
        const TypeUpDatePost:PayloadDataUpdate={
            Pro:RegisterData,
            id:id
           }
           setValidSubmit(true)
           if (infoPost.errorMsg) {
            toast(infoPost.errorMsg,{
              position: 'top-center', // Position on the screen
              autoClose: 2000, // Auto-close after 2 seconds
              hideProgressBar: true, // Hide the progress bar
              closeOnClick: true, // Close on click
              pauseOnHover: true, // Pause on hover
            }) 
          }
      
          if (!fileImg.img) {
            setImageError('Please upload an image.');
            return;
          }
      
          setImageError(null);
            
            if (!location&&fileImg.img) {
        
                dispatch(NewPostBlog(RegisterData)) 
            }
           
               
            
        

         if (location&&!infoPost.errorMsg) {
            dispatch(getStateUpDate(TypeUpDatePost))
            dispatch(UpdatePostBlog(TypeUpDatePost))  
           
         
                reset();
                navigate('/admin')
            
        }
        
       
       
       
     
      })
      
    useEffect(() => {
      
        if (!Object.values(errors)[0]&&validSubmit &&!infoPost.status&&!infoPost.errorMsg&&!imageError) {
             reset();
             navigate('/admin')
         } 
      
      
    }, [infoPost.status,reset,location,infoPost.errorMsg,imageError]);

    return (
    <div className='create'>
      <Sidebar/>
      <div className='containerPost'>
        <ToastContainer/>
          <form className='formPost'  onSubmit={handlSubmit}>
           <div className='inputs'>
             <div className='PartInfo'>
             <TextField
  type="text"
  {...register("title", {
    required: "Title is required",
    minLength: {
      value: 3,
      message: 'Title must be more than 3 characters'
    },
    maxLength: {
      value: 20,
      message: "Must have less than 20 characters"
    }
  })}
  className='text'
  label="Title"
  variant="standard"
  defaultValue={location?.title||null}
 
  placeholder='Write the title of the blog'
/>
<p className='error' data-testid="error" style={{ visibility: errors.title ? "visible" : "hidden" }}>{errors.title?.message}</p>







            
             </div>
            <input  style={{display:"none"}}type='file' id="file" name="file" onChange={handlChangeFile}/>
           <div className='PartInfo'>
           <label  className='file' htmlFor='file'><DownloadForOfflineIcon color='secondary'  />
           <p>{file?file.name:"Upload Image"}</p>
           <p>Upload Image</p>
           </label>
              
           {imageError && <p style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{imageError}</p>}
           </div>
            <div className='AreaText'>
            <TextareaAutosize 
            {...register("description",{
                required:"description is required",
                minLength:{
                    value:10,
                    message:'description must be more than 10 caracters'
                },
                maxLength:{
                    value:500,
                    message:" description must have less than 500 caracters"
                }
               })}
            value={text} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setText(event.target.value)} className='description'   placeholder='write the description of blog' />
            <p >Number of characters: {text.length}</p>
            <p className='error' data-testid="error"  style={{visibility:errors.description?"visible":"hidden",color:"red"}}  >{errors?.description?.message}</p>
            </div>
               <div className='PartInfo'>
              
               <Autocomplete
       
          options={OptionCategory}
          getOptionLabel={(option) => option}
          defaultValue={location?.cat||null}
          renderInput={(params) => (
            <TextField
            {...register('cat', { required: 'Select your choice' })}
          
              {...params}
              variant="outlined"
              label="Select Blog"
              placeholder="Select your choice"
              sx={{ m: 1, width: 500 }}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <MenuItem {...props} sx={{ justifyContent: 'space-between' }}>
              {option}
              {selected ? <CheckIcon color="info" /> : null}
            </MenuItem>
          )}
        />
                <p className='error'  >{errors.cat?.message}</p>
                
               </div>

            </div> 
           
            <Button type='submit' className='Button'variant="contained"  color="success">{location?"upDate":"Create"}</Button>
          </form>
          <div className='showImage'>
          {!fileImg.img&&!location?<p className='para'> Image</p>
             :<img className='img' alt="image" src={fileImg.img===location.img?`../../uploads/${file}`:fileImg.img} />}
            
          </div>
      </div>
    </div>
  );
}
