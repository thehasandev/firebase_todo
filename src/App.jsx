import React, { useState } from 'react'
import { getDatabase, ref, set,push } from "firebase/database";
function App() {
  let [name,setName] = useState("")
  const db = getDatabase();

  let handleAddTodo =()=>{
    set(push(ref(db, 'todo')), {
        userName : name
    });
    setName("")
  }
  return (
    <div className='max-w-7xl mx-auto pt-10'>
      <label className='text-lg font-medium'>Name : </label>
       <input value={name} type="text" className='border-black/70 border py-2' onChange={(e)=>{setName(e.target.value)}}/>
       <button onClick={handleAddTodo} className='px-4 py-2 text-lg text-white bg-black/70 rounded-r-lg '>Add Todo</button>
    </div>
  )
}

export default App