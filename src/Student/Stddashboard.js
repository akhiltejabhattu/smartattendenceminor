import React from 'react'

const Stddashboard = () => {
  return (
    <div className='text-center mt-5'> 
        <h1>Student Dash board</h1>
        <div className="d-flex flex-row justify-content-center">
            <button className='btn btn-primary m-1'>Check Attendance</button>
            <button className='btn btn-success m-1'>Mark attendance</button>
        </div>
    </div>
  )
}

export default Stddashboard