import React from 'react'

const Image = ({className, src}) => {
  return (
    <img src={src} className={className}></img>
  )
}

export default Image