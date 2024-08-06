//import { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import './Breadcrumbs.css'

const Breadcrumbs = ({ currentPath, fetchFiles }) => {
  const pathnames = currentPath === '/' ? [] : currentPath.split('/').slice(1)

  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ul className='breadcrumb'>
        <li className='breadcrumb-item' onClick={() => fetchFiles('/')}>
          home
        </li>
        {currentPath !== '/' &&
          pathnames.map((name, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`

            return (
              <li key={index} className='breadcrumb-item' onClick={() => fetchFiles(path)}>
                <span>{name}</span>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
