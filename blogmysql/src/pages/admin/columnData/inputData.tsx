import {GridColDef} from '@mui/x-data-grid'
import moment from 'moment'


export const userColumns:GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
     {field:"image",headerName:"Image",width:100,
      renderCell:(params)=>{
         return (<div className="cellWithImg">
           <img className="cellImg" src={params.row.image!=="https://img.freepik.com/icones-gratuites/utilisateur_318-159711.jpg"? `../uploads/${params?.row?.image}`:params?.row.image} alt='' />
         </div>)
      }
    
    
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      
    },
  
    {
      field: "email",
      headerName: "Email",
      width: 150,
    }
    
  
    
    
  ];

//   post Column

export const postColumns:GridColDef[]  = [
    { field: "id", headerName: "ID", width: 70 },
     {field:"img",headerName:"Image",width:120,
      renderCell:(params)=>{
         return (<div className="cellWithImg">
           <img className="cellImg" src={`../uploads/${params.row.img}`} alt='' />
         </div>)
      }
    
    
    },
    {
      field: "title",
      headerName: "Name",
      width: 150,
      
    },
  
    {
      field: "date",
      headerName: "Created At",
      width: 200,
      renderCell:(params)=>{
        return(
          <div>{moment(params.row.date).fromNow()}</div>
        )
      }
    },
      {
        field: "cat",
        headerName: "Category",
        width: 100,
      },
    
      {
        field:"image",
        headerName:"users",
        width:180,
        renderCell:(params)=>{
          return(
            <div className="cellWithImg">
              <p>{params.row.name}</p>
              <img className="cellImg" src={params.row.image!=="https://img.freepik.com/icones-gratuites/utilisateur_318-159711.jpg"? `../uploads/${params?.row?.image}`:params?.row.image} alt='' />
            </div>
          )
        }
      }

    
  
    
    
  ];