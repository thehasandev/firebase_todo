import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,push,onValue  } from "firebase/database";
import { Circles } from 'react-loader-spinner'
function App() {
  let [name,setName] = useState("")
  let [nameList,setNameList] =useState([])
  let [loader,setLoader]=useState(false)

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
        arr.push(item.val())
      })
      setNameList(arr)
    });
  },[])


  return (
    <div className='max-w-7xl mx-auto pt-10'>
      <label className='text-lg font-medium'>Name : </label>
       <input value={name} type="text" className='border-black/70 border py-2' onChange={(e)=>{setName(e.target.value)}}/>
       {
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
              <li key={index}>{item.userName}</li>
            ))
           }
         </ol>
      </div>
    </div>
  )
}

export default App