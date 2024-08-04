//import { useState, useEffect } from 'react'
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
  const pathnames = currentPath === '/' ? ['home'] : ['home', ...currentPath.split('/').slice(1)]

  // const pathnames = currentPath === '/' ? [] : currentPath.split('/').slice(1) I don't understand we should show the wotld HOME or no)

  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ol className='breadcrumb'>
        {pathnames.map((name, index) => {
          const path = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join('/')}`
          return (
            <li key={index} className='breadcrumb-item' onClick={() => fetchFiles(path)}>
              {name}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.propTypes = {
  currentPath: PropTypes.string.isRequired,
  fetchFiles: PropTypes.func.isRequired,
}

export default Breadcrumbs
