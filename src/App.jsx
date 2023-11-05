import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,push,onValue,remove  } from "firebase/database";
import { BallTriangle } from 'react-loader-spinner'
import "./App.css"

function App() {
  const db = getDatabase();
  let [name,setName] = useState("")
  let [des,setDes] = useState("")
  let [todoList,setTodoList] = useState([])
  let [update,setUpdate] = useState(false)
  let [loader,setLoader] = useState(false)
  let [updateIndex,setUpdataIndex] =useState("")
  let [errorMessage,setErrorMessage] =useState("")

  let handleAddTodo =()=>{
  if(name&&des){
    setLoader(true)
   set(push(ref(db, 'todo')), {
     userName : name,
     userDes  : des
   }).then(()=>{
     setLoader(false)
     setName("")
     setDes("")
     setErrorMessage("")
   })
 }else{
  if(!(name||des)){
    setErrorMessage("Please Enter both")
  }else if(!name){
    setErrorMessage("Please Enter Name")
  }else {
    setErrorMessage("Please Enter Des")
  }
 }
   
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

  let handleEdit =(item)=>{
   setUpdate(true)
   setName(item.userName)
   setDes(item.userDes)
   setUpdataIndex(item.id)
  }

  let handleUpdateTodo =()=>{
    if(name && des){
      set(ref(db, 'todo/'+ updateIndex), {
        userName : name,
        userDes  : des
      }).then(()=>{
        setUpdate(false)
        setErrorMessage("")
        setName("")
        setDes("")
    
      })

    }else{
      if(!(name||des)){
    setErrorMessage("Please Enter both")
    }else if(!name){
      setErrorMessage("Please Enter Name")
    }else {
      setErrorMessage("Please Enter Des")
    }
    }
  }


  return (
    <div className='max-w-7xl mx-auto pt-5'>
      <div className='flex justify-center'>
        <div className='md:w-full'>
            <div>
              <label  className='text-lg font-semibold'>Name :</label><br />
              <input value={name} onChange={(e)=>{setName(e.target.value)}} className='border md:w-1/3 rounded-[5px] border-black/40 px-2 py-2' type="text" />
            </div>
            <div className='my-4'>
              <label className='text-lg font-semibold'>Description :</label><br />
              <textarea  value={des} onChange={(e)=>{setDes(e.target.value)}} className='border  rounded-[5px] md:w-1/3 border-black/40 px-2 py-2' type="text" />
            </div>
            <div className='flex items-center gap-x-10'>
                  {
                    update ? 
                    <button onClick={handleUpdateTodo} className='px-4 py-2 text-white  bg-green-600 rounded-r-sm'>Update Todo</button>
                    :
                    
                      loader ?
                        <button>
                          <BallTriangle
                          height={30}
                          width={30}
                          radius={15}
                          color="#ffffff"
                          ariaLabel="ball-triangle-loading"
                          wrapperClass="ml-5"
                          wrapperStyle=""
                          visible={true}
                          />
                        </button>
                      :
                      <button onClick={handleAddTodo} className='px-4 py-2 text-white  bg-blue-600 rounded-r-sm'>Add Todo</button>
                  }
                    {
                      errorMessage && 
                      <h1 className='text-[red]  text-sm'>{errorMessage} !</h1>
                    }
            </div>

        </div>
      </div>
    
  
 
    {
     todoList.length > 0 ?
     <h1></h1>
     :
     <h1 className='text-lg pt-10 pl-5'>No Post</h1>
    }
     <div className='flex gap-10 flex-wrap pt-10 justify-center md:justify-start'>
      {
        todoList.map((item)=>(
          <div className='bg-white rounded-sm shadow-md border border-black/20 w-[250px] flex justify-center py-4' key={item.id}>
            <div>
              <h1 className='text-3xl font-semibold text-black'>{item.userName}</h1>
              <p className='text-lg my-2 text-black'>{item.userDes}</p>
              <button onClick={()=>{handleEdit(item)}} className='px-4 py-1 text-sm text-white bg-blue-600 rounded-sm mr-2'>Edit</button>
              <button onClick={()=>{handleDelete(item)}} className='px-4 py-1 text-sm text-white bg-[red] rounded-sm '>Delete</button>
            </div>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default App