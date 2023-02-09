import React, { FC } from 'react'

interface SlideTittleProps {
  tittle: string
}

const SlideTittle:FC<SlideTittleProps> = ({tittle}) => {
  return (
    <div className='slide-title'>{tittle}</div>
  )
}

export default SlideTittle