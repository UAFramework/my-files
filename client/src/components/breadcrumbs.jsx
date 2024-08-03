import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Breadcrumbs.css'

// internal logic for breadcrumbs:
// "/"   -->  ["home"]
// "/one" --> ["home", "one"]
// "/one/one_one" --> ["home", "one", "one_one"] --> home / one / one_one
//
// hint:
// ["home", "one", "one_one"].join("/")

const Breadcrumbs = ({ currentPath, fetchFiles }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    const pathnames = currentPath === '/' ? [``] : currentPath.split('/').slice(1)
    console.log('Current Path:', currentPath)

    const newBreadcrumbs = [{ name: 'home', path: '/' }]

    pathnames.forEach((name, index) => {
      if (name) {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`
        newBreadcrumbs.push({ name, path })
      }
    })

    setBreadcrumbs(newBreadcrumbs)
  }, [currentPath])

  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ol className='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className='breadcrumb-item'
            onClick={() => {
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

Breadcrumbs.propTypes = {
  currentPath: PropTypes.string.isRequired,
  fetchFiles: PropTypes.func.isRequired,
}

export default Breadcrumbs
