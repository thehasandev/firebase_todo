import React from 'react'

function App() {
  return (
    <div className='max-w-7xl mx-auto pt-10'>
      <label className='text-lg font-medium'>Name : </label>
       <input type="text" className='border-black/70 border py-2'/>
       <button className='px-4 py-2 text-lg text-white bg-black/70 rounded-r-lg '>Add Todo</button>
    </div>
  )
}

export default App