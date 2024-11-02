import React from 'react'
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className='px-4 my-4'>
        <div className='w-full relative'>
            <input 
            type='text' 
            className='border text-sm rounded-lg block w-full p-2.5 bg-slate-100 border-gray-300 text-white'
            placeholder='Send a message'></input>
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'><BsSend /></button>
        </div>
    </form>
  )
}

export default MessageInput