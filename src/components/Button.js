import React from 'react'

const Button = ({name}) => {
  return (
    <div>
      <button className=' font-semibold bg-gray-300 border-2 px-5 py-2 m-2 rounded-lg '>{name}</button>
    </div>
  )
}

export default Button;
