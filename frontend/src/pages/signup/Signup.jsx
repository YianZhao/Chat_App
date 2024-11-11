import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  // 用useState来获取用户输入信息
  const [inputs,setInputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:'',
  })
  
  const handleCheckboxChange = (gender)=>{
    setInputs({...inputs,gender})
  }
  //useSignup 是一个自定义 Hook 是从自定义 Hook useSignup 中解构出两个值：loading 和 signup。
  const { loading, signup } = useSignup();

  const handleSubmit=async(e)=>{
    // 用来防止这个网页点击上传的时候刷新 
    e.preventDefault()
    await signup(inputs);//调用了signup钩子
  }
  
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-white'>Sign up
            <span className='text-blue-400'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className='mb-2 mt-5'>
              <label className='label'>
                <span className='text-base label-text'>Full Name</span>
              </label>
              <input 
                type='text' 
                placeholder='Enter fullname' 
                className='w-full input input-bordered h-10 -mt-2'
                value={inputs.fullName}
                onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}/>
          </div>
          <div className='mb-2'>
              <label className='label p-2'>
                <span className='text-base label-text'>Username</span>
              </label>
              <input 
              type='text' 
              placeholder='Enter username' 
              className='w-full input input-bordered h-10 -mt-2'
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>
          </div>
          <div className='mb-2'>
              <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input 
                type='password' 
                placeholder='Enter password' 
                className='w-full input input-bordered h-10 -mt-2'
                value={inputs.password}
                onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
          </div>
          <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Confirm password</span>
              </label>
              <input 
              type='password' 
              placeholder='Enter confirn password' 
              className='w-full input input-bordered h-10 -mt-2'
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}/>
          </div>

          {/* gender check box in here */}
          <GenderCheckBox onCheckboxChange = {handleCheckboxChange}selectedGender={inputs.gender} />
          <div>
            <Link to='/login' className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block mt-5'>
              Already have an account?
            </Link>
          </div>
          <div>
            <button className='btn btn-block btn-sm mt-2 bg-white' disabled={loading}>
                {loading?<span className='loading loading-spinner text-info'></span>:'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup