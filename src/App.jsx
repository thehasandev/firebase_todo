import React from 'react'

function App() {
  return (
    <div className='m-5'>
      <label className='font-medium text-lg '>Name : </label>
      <input className='border border-black/40 px-2 py-2' type="text" />
      <label className='font-medium text-lg '> Des : </label>
      <input className='border border-black/40 px-2 py-2' type="text" />
      <button className='px-4 py-2 text-white  bg-blue-600 rounded-r-sm'>Add todo</button>
    </div>
  )
}

export default App