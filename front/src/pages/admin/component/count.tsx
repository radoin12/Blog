import React from 'react';
import "./count.scss"
type ItemCount={
    count:{
        art: number
      }|
      {
        cinema: number
      }|
      {
        science: number
      }|
      {
        Food: number
      }|
      {
        design: number
      }|
      {
        technology: number
      }
}

export default function CountBlog({count}:ItemCount) {
  
  return (
    <div className='styleCount'>
      <h2>{Object.keys(count)}</h2>
       <p>Total {Object.values(count)}</p>
    </div>
  );
}
