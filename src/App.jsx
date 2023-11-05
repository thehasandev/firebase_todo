import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,push,onValue,remove  } from "firebase/database";

function App() {
  const db = getDatabase();
  let [name,setName] = useState("")
  let [des,setDes] = useState("")
  let [todoList,setTodoList] =useState([])

  let handleAddTodo =()=>{
    set(push(ref(db, 'todo')), {
      userName : name,
      userDes  : des
    }).then(()=>{
      console.log("Done");
      setName("")
      setDes("")
    })


  }

  useEffect(()=>{
    const starCountRef = ref(db, 'todo');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          arr.push({...item.val(),id:item.key})
        })
        setTodoList(arr)

      });
  },[])

  let handleDelete =(item)=>{
    remove(ref(db, 'todo/'+item.id))
  }
  return (
    <div className='m-5'>
      <label className='font-medium text-lg '>Name : </label>
      <input value={name} onChange={(e)=>{setName(e.target.value)}} className='border border-black/40 px-2 py-2' type="text" />
      <label className='font-medium text-lg '> Des : </label>
      <input value={des} onChange={(e)=>{setDes(e.target.value)}} className='border border-black/40 px-2 py-2' type="text" />
      <button onClick={handleAddTodo} className='px-4 py-2 text-white  bg-blue-600 rounded-r-sm'>Add todo</button>
     
     {
      todoList.map((item)=>(
        <div key={item.id}>
          <h1 className='text-3xl font-semibold text-black'>{item.userName}</h1>
          <p className='text-lg my-1 text-black'>{item.userDes}</p>
          <button className='px-4 py-1 text-lg text-white bg-blue-600 rounded-sm mr-2'>Edit</button>
          <button onClick={()=>{handleDelete(item)}} className='px-4 py-1 text-lg text-white bg-[red] rounded-sm '>Delete</button>
        </div>
      ))
     }
    </div>
  )
}

export default App