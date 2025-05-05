import React from 'react'

export default function Footer() {
  return (
    <footer className='mx-5 md:mx-10 text-xs font-medium h-9'>
        <div className='flex justify-between items-center h-full'>
            <div className='flex items-center h-full'>
                @2025
            </div>
            <div className='flex gap-1 font-light'>
                <div className='my-1'>
                    Develop & Desing
                </div>
                <div className='flex items-end font-bold'>
                    <p className='text-3xl'>S</p>
                    <p className='text-xs'>@</p>
                </div>
            </div>
        </div>
    </footer>
  )
}
