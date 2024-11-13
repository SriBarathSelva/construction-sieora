import React from 'react'

const Configuration = () => {
  return (
    <div className='m-10'>
      <strong>Configuration</strong>
    <br />
    <div className='flex items-center '>
    <h2 className='text-xl font-bold'>₹</h2>
      <input className='border-2 p-2 px-4 m-3' value={"50000000"} type="number" placeholder='balance' />
    </div>
    </div>
  )
}

export default Configuration