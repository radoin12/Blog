
import React from 'react';
import Sidebar from '../../../component/sidebar';
import Table from '../component/table';
import"./ListeUser.scss"
import {GridColDef} from '@mui/x-data-grid'
 interface typeColumn{
  column:GridColDef[]
 }
export default function List({column}:typeColumn) {
  
  return (
    <div className='ListUser'>
        <Sidebar />
        <div className='containerUser'>
       
           <Table getCol={column} />
        </div>
    </div>
  );
}
