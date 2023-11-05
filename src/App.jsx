import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,push,onValue,remove,update   } from "firebase/database";
import { Circles } from 'react-loader-spinner'
function App() {
  let [name,setName] = useState("")
  let [nameList,setNameList] =useState([])
  let [loader,setLoader]=useState(false)
  let [update,setUpdate]=useState(false)
  let [updateIndex,setUpdateIndex] = useState("")
 

  const db = getDatabase();

  let handleAddTodo =()=>{
    setLoader(true)

    set(push(ref(db, 'todo')), {
        userName : name
    }).then(()=>{
      setLoader(false)
    })

    setName("")
  }

  useEffect(()=>{
    const starCountRef = ref(db, 'todo');
    onValue(starCountRef, (snapshot) => {
      let arr =[]
      snapshot.forEach((item)=>{
        arr.push({...item.val() , id : item.key})
      })
      setNameList(arr)
    });
  },[])

  let handleDelte =(item)=>{
    remove(ref(db, 'todo/'+item.id))
   }

  let handleEdit =(item)=>{
    setName(item.userName)
    setUpdate(true)
    setUpdateIndex(item.id)
  } 

  let handleUpdateTodo =()=>{
    set(ref(db, 'todo/'+ updateIndex), {
      userName : name
      }).then(()=>{
       setUpdate(false)
       setName("")
      })
  }


  return (
    <div className='max-w-7xl mx-auto pt-10'>
      <label className='text-lg font-medium'>Name : </label>
       <input value={name} type="text" className='border-black/70 border py-2' onChange={(e)=>{setName(e.target.value)}}/>
       {
        update ? 
          <button onClick={handleUpdateTodo} className='px-4 py-2 text-lg text-white bg-black/70 rounded-r-lg '>Update Todo</button>
       :

        loader ?
        <button>
          <Circles
             height="20"
             width="20"
             color="#4fa94d"
             ariaLabel="circles-loading"
             wrapperStyle={{}}
             wrapperClass="ml-5"
             visible={true}
           />
        </button>
         :
        <button onClick={handleAddTodo} className='px-4 py-2 text-lg text-white bg-black/70 rounded-r-lg '>Add Todo</button>
       
        }
     
      
      <div>
         <ol type='square'>
           {
            nameList.map((item,index)=>(
              <div key={index}>
              <li >{item.userName}</li>
               <button onClick={()=>{handleEdit(item)}} className='text-white bg-blue-700 px-4 rounded-[2px] mr-2 py-2'>Edit</button>
               <button onClick={()=>{handleDelte(item)}} className='text-white bg-red-600 px-4 py-2 rounded-[2px]'>Delete</button>
              </div>
            ))
           }
         </ol>
      </div>
    </div>
  )
}

export default App