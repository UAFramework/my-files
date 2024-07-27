import React, { useState, useEffect } from 'react'
import './Breadcrumbs.css'

// internal logic for breadcrumbs:
//
// "/"   -->  ["home"]
// "/one" --> ["home", "one"]
// "/one/one_one" --> ["home", "one", "one_one"] --> home / one / one_one
//
// hint:
// ["home", "one", "one_one"].join("/")

const Breadcrumbs = ({ currentPath, fetchFiles }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    const pathnames = currentPath.split('/')

    // TODO: not sure if we need this?
    const newBreadcrumbs = [{ name: 'home', path: '/' }]

    pathnames.forEach((name, index) => {
      newBreadcrumbs.push({ name, path: currentPath })
    })

    setBreadcrumbs(newBreadcrumbs)
  }, [])

  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ol className='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className='breadcrumb-item'
            onClick={(e) => {
              fetchFiles(breadcrumb.path)
            }}
          >
            {breadcrumb.name}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
