import React from 'react'
import { Link } from 'react-router-dom'

const Back = () => {
  return (
    <div>
        <Link className='back' to={'/interface'} >
                <i className='fa fa-arrow-right'></i>
                Back
        </Link>
    </div>
  )
}

export default Back