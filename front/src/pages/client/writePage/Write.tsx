import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import{useState} from "react"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { NewPostBlog, UpdatePostBlog, postState } from '../../../component/redux/post';
import { useLocation, useNavigate } from 'react-router';
import convertTo64Bit from './convertTo6s';



type PostType={
  title?:string ,
  cat?:string,

}



export type PayloadData={
  title?:string ,
  cat?:string,
  img?:any|null,
  description?:string|null
}


export type PayloadDataUpdate={
  Pro:PayloadData,
  id:number|string
}
type typeImageFile={
  img:any
}
export const convertToPlainText = (html:any) => {
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(html, 'text/html');
  return parsedHtml.body.textContent;
};
export default function Write() {
    //  use location to get the id from post
  const {state} =useLocation()

 const[validSubmit,setValidSubmit]=useState<boolean>(false)
  const[value,setValue]=useState<string>(state?.onePost?.description||'')
  const [post,setPost]=useState<PostType|null>({title:state?.onePost?.title||'',cat:state?.onePost?.cat||""})
  const[file,setFile]=useState<any>(`${state?.onePost?.img}`||null)
  const[fileImg,setFileImg]=useState<typeImageFile>({img:state?.onePost?.img||''})
  const [imageError, setImageError] = useState<string | null>(null);
  const[load,setLoad]=useState<boolean>(true)
  const dispatch=DispatchApp()
  const infoPost=SelectorApp(postState)
  const[editorError,setEditorError]=useState<string|null>(null)
  const handlerChangePost=(e:React.ChangeEvent<HTMLInputElement>)=>{
   
    
   
    setPost({...post,[e.target.name]:e.target.value as string})
  
   
}
const handlChangeFile=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault()
  setFile(e.target?.files&&e.target?.files[0] )
  const convertImg=await convertTo64Bit(e.target.files&&e.target?.files[0])
  setFileImg({img:convertImg})
}


const handleEditorChange = (content:string) => {
  setValue(content);
};

const navigate=useNavigate()
const upload = async () => {
  try {
   
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post('/api/upload', formData);
    setLoad(false)
    console.log(data,"data dile")

    return data;
  } catch (error) {
    console.log(error,"error")
    setLoad(false)
 
    
  }
};

  
useEffect(() => {
  if (state?.onePost?.img) {
    setFileImg({ img: state?.onePost.img });
  }
}, [state]);



useEffect(() => {
  // Check if all the conditions are met for form submission
  if (!infoPost.errorMsg &&!editorError&& infoPost.status=== false && validSubmit && !imageError) {
    // Navigate to the home page after a successful form submission
    navigate('/'); 
  }
}, [infoPost.errorMsg, infoPost.status]);
const editorContent:string|any =convertToPlainText(value)

const handlClick=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  
  e.preventDefault()
  const imgData = await upload(); // Upload the image and get the image URL
    

   setValidSubmit(true)
      const Data = {
        title: post?.title,
        cat: post?.cat,
        img:file&&imgData||file,
        description: editorContent,
      };

  
 

  
  
     if (!fileImg.img) {
      setImageError('Please upload an image.');
      return;
    }

    setImageError(null);
    
   
    if (!state && fileImg.img&&!editorError) {
      dispatch(NewPostBlog(Data));
    } else if (state&&!editorError) {
      const TypeUpDatePost :PayloadDataUpdate= {
        Pro: Data,
        id: state.id,
      };
     
      dispatch(UpdatePostBlog(TypeUpDatePost));
    }
   
 
}
useEffect(()=>{

  if ((editorContent.length>250)) {
    setEditorError("should write maxumum 250 letters ")
  }
  else{
   setEditorError(null)
  }
},[editorContent.length])

console.log(editorContent.length)


  return (
    <div className='Add'>
       <div className='container'>
        <input required type='text' placeholder='Title'value={post?.title} name="title"  onChange={handlerChangePost}/>
        <div className='editorText'>
       
        <ReactQuill  value={value} className='editor' theme="snow"  id="description"  onChange={handleEditorChange}
        
        />
       
        </div>
        <p style={{color:"red",textAlign:'center',padding:'10px'}}>{editorError}</p>
        <p style={{color:"red",textAlign:'center',padding:'10px'}}>{infoPost.searchVal}</p>
        <p style={{color:"red",textAlign:'center',padding:'10px',visibility:infoPost.errorMsg&&!editorError?"visible":"hidden"}} >{infoPost?.errorMsg}</p>
       </div>
       <div className='Menu'>
       <div className='Item'>
        {!state?<h2>Publish</h2>:<h2>up Date</h2>}
        <label className='borderImage'  >
          {!fileImg.img&&!state?<p className='para'> Image</p>
             :<img className='img' alt="image" src={fileImg.img===state?.onePost.img?`../../uploads/${file}`:fileImg.img} />}

        </label>
        <span>
          <b>status</b> Draft
        </span>
        <span>
          <b>Visibility</b> public
        </span>
        <input  style={{display:"none"}}type='file' id="file" name="file" onChange={handlChangeFile}/>
        <label className='file' htmlFor='file'>Upload Image</label>
        {imageError && <p style={{ color: 'red', textAlign: 'center', padding: '10px',visibility:fileImg.img?"hidden":"visible" }}>{imageError}</p>}
        <div className='buttons'>
          <button>Save as Draft</button>
          <button type='submit' onClick={handlClick}>{!state?"publish":"up Date"}</button>
        </div>
       </div>
       <div className='Item'>
     <FormControl>
        <FormLabel className='Title' id="demo-row-radio-buttons-group-label">Categories</FormLabel>
         <RadioGroup className='RadioCat' value={post?.cat}name="cat" onChange={handlerChangePost}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
     
      >
        <FormControlLabel  sx={{width:"150px"}} checked={post?.cat==="art"}value="art" control={<Radio />} label="Article" />
        <FormControlLabel sx={{width:"150px"}}checked={post?.cat==="science"} value="science" control={<Radio />} label="Science" />
        <FormControlLabel sx={{width:"150px"}}checked={post?.cat==="technology"} value="technology" control={<Radio />} label="Technology" />
        <FormControlLabel sx={{width:"150px"}}checked={post?.cat==="cinema"} value="cinema" control={<Radio />} label="Cinema" />
        <FormControlLabel sx={{width:"150px"}}checked={post?.cat==="design"}value="design" control={<Radio />} label="Design" />
        <FormControlLabel sx={{width:"150px"}}checked={post?.cat==="Food"}value="Food" control={<Radio />} label="Food" />
       
      </RadioGroup>
    </FormControl>
       
       </div>
       </div>
    </div>
  );
}
