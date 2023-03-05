import React from 'react'

function Square({value,onClick}) {
  return (
      <button className='square' data={value} onClick={onClick}>{value}</button>
      
  )
}

export default Square

