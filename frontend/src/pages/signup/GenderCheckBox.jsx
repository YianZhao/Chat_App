import React from 'react'

const GenderCheckBox = () => {
  return (
    <div className='flex gap-x-4 mt-2'>
        <div className='form-control'>
            <label className='label flex gap-2 cursor-pointer'>
                <span className='label-text '>Male</span>
                <input type='checkbox' className='checkbox border-slate-500'></input>
            </label>
        </div>
        <div className='form-control'>
            <label className='label flex gap-2 cursor-pointer'>
                <span className='label-text '>Female</span>
                <input type='checkbox' className='checkbox border-slate-500'></input>
            </label>
        </div>
    </div>
  )
}

export default GenderCheckBox