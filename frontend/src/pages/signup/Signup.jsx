import React from 'react'
import GenderCheckBox from './GenderCheckBox'

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-white'>Sign up
            <span className='text-blue-400'> ChatApp</span>
        </h1>

        <form >
          <div className='mb-2 mt-5'>
              <label className='label'>
                <span className='text-base label-text'>Full Name</span>
              </label>
              <input type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10 -mt-2'></input>
          </div>
          <div className='mb-2'>
              <label className='label p-2'>
                <span className='text-base label-text'>Username</span>
              </label>
              <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 -mt-2'></input>
          </div>
          <div className='mb-2'>
              <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10 -mt-2'></input>
          </div>
          <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Confirn password</span>
              </label>
              <input type='password' placeholder='Enter confirn password' className='w-full input input-bordered h-10 -mt-2'></input>
          </div>

          {/* gender check box in here */}
          <GenderCheckBox/>
          <div>
            <a href='#' className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block mt-5'>
              Already have an account?
            </a>
          </div>
          <div>
            <button className='btn btn-block btn-sm mt-2 bg-white'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup