import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className='flex justify-around bg-black text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>MyTask</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold translate-all'>Home</li>
                <li className='cursor-pointer hover:font-bold translate-all'>Tasks</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
