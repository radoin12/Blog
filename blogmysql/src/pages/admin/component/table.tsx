  import React from 'react';
  import { DataGrid,GridColDef } from "@mui/x-data-grid";
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import user, { DeleteUser, RegisterUserType, UserState, findOneUser, getIdUser } from '../../../component/redux/user';
import { Link, useLocation } from 'react-router-dom';
import{Avatar,Box,Modal,IconButton, Button, Typography,CardMedia,Stack} from "@mui/material"
import "./table.scss"
import { ToastContainer, toast } from 'react-toastify';

import useMediaQuery from '@mui/material/useMediaQuery';
import { DeletePost, FindOnePost, OneUserWithPosts, PostJoinUserType,  PostUserType,  postState, saerchItem } from '../../../component/redux/post';
import{useState,useEffect,  useCallback} from "react"
import moment  from "moment"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonStyled, Container, Detailuser, ImgDateUser, ImgUser, Para, User, UserInfo } from './styledTables';


import { ButtonStyledOnePost, EroorPara, StyledPostList } from './StyledPost';
import ListPostUser from './ListPost';
import { isDisabled } from '@testing-library/user-event/dist/utils';
 interface typeColumn{
  getCol:GridColDef[]
 }
  export default function Table({getCol}:typeColumn) {
    const Users=SelectorApp(UserState)
     const posts=SelectorApp(postState)
     const{onePost}=posts
     const[page,setPage]=useState<number>(0)
     const[open,setOpen]=useState<boolean>(false)
     const [getId,setGetId]=useState<number|null|any>(null)
    const [toggle,setToggle]=useState<boolean>(false)
    
     const dispatch=DispatchApp()
     const[postJoinUser,setPostJoinUser]=useState<PostJoinUserType[]>([])
   
     useEffect(() => {
        setPostJoinUser(posts.PostJoinUser.filter((post)=>post.cat.includes(posts.searchVal)))
       }, [posts.PostJoinUser,posts.searchVal]);
        
        const location=useLocation()
       
      
    
       const RouteName:string=location.pathname.split('/')[2]
       const allUser:RegisterUserType[]=Users?.users.filter((item)=>item.name.includes(posts.searchVal))||[]
        
       
     
       const pageSize=30
       const TotalCountPage=Math.ceil(allUser.length/pageSize)
       const TotalCountPagePost=Math.ceil(postJoinUser.length/pageSize)
       const rowsuser:RegisterUserType[]=allUser.slice(page*pageSize,(page+1)*pageSize)
       const rowsPost:PostJoinUserType[]=postJoinUser.slice(page*pageSize,(page+1)*pageSize)
        
      //  Pagination for user with his Posts
      const postUserAll:PostUserType=posts?.UserWithPosts&&posts?.UserWithPosts
      const  pageSizePost=1
      const rowsPosttUser=posts?.UserWithPosts&&postUserAll?.post?.slice(page*pageSizePost,(page+1)*pageSizePost)
      const[openRegester,setOpenRegester]=useState<boolean>(false)
      const Total=postUserAll?.post&&postUserAll?.post?.length/pageSizePost
      
       const handlePageChange=(page:number)=>{


           setPage(page)
        }
       
        const HandlClickView=(e:any,id:number) => {
           
            setGetId(id)
           
            setOpen(!open)
           
           }
          //  delete Post ANd user
          const HandlDelete=(id:number)=>{
            if ( RouteName==="users") {
              dispatch(getIdUser(id))
              dispatch(DeleteUser(id))

            }
            else if(RouteName==="posts"){
             dispatch(DeletePost(id))
           
            }
            

          }

          const HandlDeletePost=(id:number)=>{
            console.log(id,"id")
            dispatch(DeletePost(id))
           
            if (posts.errorMsg) {
              toast("you are not allow to delete this blog",{
                position: 'top-center', // Position on the screen
                autoClose: 2000, // Auto-close after 2 seconds
                hideProgressBar: true, // Hide the progress bar
                closeOnClick: true, // Close on click
                pauseOnHover: true, // Pause on hover
              })
            }
            else{
              setOpen(false)
            }
          }
        // Toglle Model View
       const isVisble=useMediaQuery("(min-width: 900px)")
       const visbleButton=useMediaQuery('(min-width:600px) and (max-width:900px)')
      
      
        useEffect(() => {
          if ( RouteName==="posts") {
            dispatch(FindOnePost(getId)) 
          }
          if ( RouteName==="users") {
            dispatch(findOneUser(getId))
            dispatch(OneUserWithPosts(getId))
          }
        }, [getId,dispatch,RouteName]);

       const actionColumn:GridColDef[] = [
        {
          field: "action",
          headerName: "Action",
          width: 300,
          renderCell: (params) => {
            return (
              <div className="cellAction">
             
                  <button type='submit' className="viewButton" onClick={(e)=>HandlClickView(e,params.row.id)}>View</button>
                   
             
              
                <div className="deleteButton" onClick={()=>HandlDelete(params.row.id)}>
                  Delete
                </div>
              </div>
            );
          },
        },
      ];

    return (
        <div className="datatable" style={{width:RouteName==="posts"?"1300px":"1000px"}}>
        <ToastContainer  position={"top-center"}/>
        <div className="datatableTitle" >
           <p>Add new</p>
        { RouteName==="posts"?<Link to={`/admin/posts/create`} className="link">
             Add New Blog
          </Link>
        :  
        <Link to={`/admin/users/create` } className="link" >
            Add new User
          </Link>
        }
        </div>
        
    
        
        
         
       
          <DataGrid
          className="datagrid"
          rowHeight={60} 
          columns={getCol.concat(actionColumn)}
          rows={RouteName==="posts"? rowsPost:rowsuser}
          getRowId={(row) => row.id}
          
     
        />
       
       <div className="pagination">
          <button className='previous' onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <span className='pageCount'>{page+1} of {RouteName==="posts"?TotalCountPagePost: TotalCountPage}</span>
          <button className='next' onClick={() => handlePageChange(page + 1)} disabled={page+1 === TotalCountPage}>
            Next
          </button>
        </div>
           
        { RouteName==="posts"&&<Modal 
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">    
          <Box  bgcolor="Background.default" color="text.primary"sx={{ position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  
                    width: {
                        xs:300,
                        sm:500,
                        md:800,
                        lg:1000
                      
                    },
                 
                  
                        height:600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4}} >


            
             
               <Typography component="h2" sx={{pb:2,textAlign:"center" ,color:'red'}}>Blog</Typography>
                <div >
              
               
                 <CardMedia
                  component="img" sx={{objectFit:"cover",pb:1, height:{
                          lg:300,
                          sm:250,
                          xsm:100
                            } ,
                         width:{
                        lg:300,
                        sm:250,
                        xsm:100,
                     
                            }
    
    }}
        image={`../uploads/${posts?.onePost?.img}`}
        alt=""
      />
                 <User >
                  <ImgDateUser>
                     <img  className='imgUser' src={posts?.onePost?.image?posts?.onePost?.image:"data:image/png;base64,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"}
                      style={{width:"50px",height:"50px"}}
                     alt=''/>
                    <Detailuser>
                     <Typography component="h2">{posts.onePost?.name}</Typography>
                     <span className='date'>Publiched At { moment(posts?.onePost?.date).fromNow()}</span>
                   
                    </Detailuser>
                  </ImgDateUser>
                   <div className='edit'>
                    


                     <Link to={"/admin/posts/create"}state={ {post:posts.onePost,id:getId}} >
                     <IconButton aria-label="edit" size="large">
                     
                      <Avatar sx={{ bgcolor: "green" }}>
                        <EditIcon color="inherit"fontSize="inherit" />
                      </Avatar>
                        
                    </IconButton>
                     </Link>
                    <IconButton aria-label="delete" size="large" onClick={()=>HandlDeletePost(getId)}  >
                     
                     <Avatar sx={{ bgcolor: "red" }}>
                      <DeleteIcon   />
                     </Avatar>
                          
                      </IconButton>
                    
                     </div>
             
                      </User>
                        <Typography component="h3"  sx={{color:'blue',fontSize:{
                          sm:"20px",
                          
                          lg:"35px"
                        }}}>{posts.onePost?.title}</Typography>
                         <p className='desc'>{posts.onePost?.description}</p>
                 
                       
                        </div>
                        <ButtonStyled onClick={()=>setOpen(false)}>cancel</ButtonStyled>
                        </Box>
                      </Modal>
                     
                   
                     }

                     {
                      RouteName==="users"&&Users?.oneUser&&  <Modal open={open}  
                    
                      onClose={()=>setOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">    
                            
                           
       
                            <Box  bgcolor="Background.default" color="text.primary" sx={{ position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  
                    width: {
                      xs:300,
                      sm:500,
                      md:800,
                      lg:1000
                      
                    },
                        height:600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4}} >
                                    <UserInfo>
                                       < ImgUser src={Users?.oneUser.image?`../uploads/${Users?.oneUser.image}`:"https://img.freepik.com/icones-gratuites/utilisateur_318-159711.jpg"}></ImgUser>
                                  

                                      < Container>
                                      <UserInfo> <Para>Name</Para> <Para>{Users?.oneUser?.name}</Para></UserInfo>
                                      <UserInfo> <Para>Email</Para>   <Para>{Users?.oneUser?.email}</Para></UserInfo>
                                      </Container>
                                  
                                     </UserInfo>
                                     <Link to={"/admin/users/create"}state={Users?.oneUser} >
                                    <IconButton aria-label="edit" size="large">
                                    
                                     <Avatar sx={{ bgcolor: "green" }}>
                                       <EditIcon color="inherit"fontSize="inherit" />
                                     </Avatar>
                        
                                      </IconButton>
                                       </Link>
        <div>            
  {
    posts.status&&posts.status?<p>... loading</p>:
    posts.errorMsg?<p>verify your connection</p>:
  <div className='homeContainer'>
      
  
   
    <div >
       {
        isVisble||toggle?
        <StyledPostList >
        
        {
            rowsPosttUser&&  rowsPosttUser?.map((post:any,i:number)=>(
            <ListPostUser key={i} userPost={post} toggle={toggle} setToggle={setToggle}/>
          ))
        }
          { rowsPosttUser&& rowsPosttUser.length>0&&  <div>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <span >{page + 1} of { Total}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page+1 ===  Total||rowsPosttUser?.length===0}>
              Next
            </button>
          </div>}
      </StyledPostList>:""
     
       }
        {!(rowsPosttUser&&rowsPosttUser.length>0)&&<EroorPara>there is no list blog for {Users?.oneUser?.name}</EroorPara>}
         { visbleButton&&!toggle&&  <ButtonStyledOnePost disabled={rowsPosttUser&&rowsPosttUser.length>0?false:true} onClick={()=>setToggle(true)}>Open List Blog</ButtonStyledOnePost>}
 
    </div>
  

    </div>
  
  }
</div>
                                       
                                   
                                   <ButtonStyled onClick={()=>setOpen(false)}>cancel</ButtonStyled>   
                                 </Box>
                     
                            </Modal>
                     }
                    
                  
          
            
      </div>
    );
  }
  