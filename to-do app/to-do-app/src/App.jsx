import { useState } from 'react'
import React from 'react'
import Input from './components/Input'
import Todo from './components/Todo'

const App = () => {
  const[list,SetList]=useState([]);//we initalize with blank array since it will store list value
  //we define fn to store data from child component to parent component we use prop
  let addlist = (input)=>{
    if(input!=='')
      SetList([...list,input]);
  }
  const dellist=(key)=>{
    let updatedlist = [...list];
    updatedlist.splice(key,1)
    SetList([...updatedlist])
  }
  return (
    <div className='flex flex-col'>
      <Input addlist={addlist}/>
     <h1 className='text-2xl font-bold text-blue-600'>TODO</h1>
     <hr/>
     {list.map((list,i)=>{ //two argument list array and item
      return(
        <Todo key={i} index={i} item={list} deleteitem={dellist}/> //here item we pass array of task to perform
      )
     })}
    </div>
  )
}

export default App