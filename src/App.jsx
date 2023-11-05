import React, { useState } from 'react'

function App() {
  let [name,setName] = useState("")
  let [des,setDes] = useState("")

  let handleAddTodo =()=>{
    console.log(name,des);
  }
  return (
    <div className='m-5'>
      <label className='font-medium text-lg '>Name : </label>
      <input value={name} onChange={(e)=>{setName(e.target.value)}} className='border border-black/40 px-2 py-2' type="text" />
      <label className='font-medium text-lg '> Des : </label>
      <input value={des} onChange={(e)=>{setDes(e.target.value)}} className='border border-black/40 px-2 py-2' type="text" />
      <button onClick={handleAddTodo} className='px-4 py-2 text-white  bg-blue-600 rounded-r-sm'>Add todo</button>
    </div>
  )
}

export default App