import React from 'react'
import { twMerge } from 'tailwind-merge'

const Boxfee = ({fee,title,select,className}) => {
  return (
    <div className={twMerge("border-[0.5px]  min-h-[111px] flex flex-col gap-2 border-gray-700/40 rounded-md p-2 w-full h-full",className) }>
    {fee}
  <p className='text-[12px] whitespace-nowrap  font-medium text-[#9B9B9B]'>
  {title}
  </p>  
  <span className='p-2 bg-[#1B1B1B] text-[10px]  w-fit rounded-md'>
  {select}
  </span>
    </div>
  )
}

export default Boxfee
