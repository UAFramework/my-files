// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Breadcrumbs.css'

// eslint-disable-next-line react/prop-types
const Breadcrumbs = ({ onClick }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const location = useLocation()

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x)
    let currentPath = '/'
    const newBreadcrumbs = [{ name: 'home', path: '/' }]

    // eslint-disable-next-line no-unused-vars
    pathnames.forEach((name, index) => {
      currentPath = `${currentPath}${name}/`
      newBreadcrumbs.push({ name, path: currentPath })
    })

    setBreadcrumbs(newBreadcrumbs)
  }, [location.pathname])

  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ol className='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className='breadcrumb-item'>
            <a
              href={breadcrumb.path}
              onClick={(e) => {
                e.preventDefault()
                onClick(breadcrumb.path)
              }}
            >
              {breadcrumb.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
