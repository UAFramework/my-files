import './Breadcrumbs.css'

const pathToBreadcrumbs = (currentPath) => {
  if (currentPath === '/') {
    return [{ name: 'home', path: '/' }]
  }

  const paths = currentPath.split('/').slice(1)
  return [
    { name: 'home', path: '/' },
    ...paths.map((name, index) => ({
      name,
      path: `/${paths.slice(0, index + 1).join('/')}`,
    })),
  ]
}

const Breadcrumbs = ({ currentPath, fetchFiles }) => {
  const breadcrumbs = pathToBreadcrumbs(currentPath)
  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ul className='breadcrumb'>
        {breadcrumbs.map(({ name, path }, index) => (
          <li key={index} className='breadcrumb-item' onClick={() => fetchFiles(path)}>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
