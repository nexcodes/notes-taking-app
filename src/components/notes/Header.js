import React from 'react'

const Header = () => {

  return (
    <div className='flex items-center'>
        <img src={"https://lh3.googleusercontent.com/a/AAcHTtdgXb3CUfVjAyXBR7tBrDKW_p20S8IYknfHUbkBoZFljw=s96-c"} className='w-8 h-8 rounded-full' alt="Profile Pic" />
        <span className='font-medium text-gray-700 dark:text-gray-300 text-md ml-4 mt-2'>Hello Mohid!</span>
    </div>
  )
}

export default Header