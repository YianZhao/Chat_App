import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full '>
                <img
                alt='Tailwindcss chat bubble component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'>
                </img>
            </div>
        </div>
        <div className='chat-bubble text-white bg-blue-500'>Hello world</div>
        <div className='chatfooter opacity-50 text-sm flex gap-1 items-center'>12:45</div>
    </div>
  )
}

export default Message