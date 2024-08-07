import './Breadcrumbs.css'

const pathToBreadcrumbs = (currentPath) => {
  const paths = currentPath.split('/').slice(1)
  const breadcrumbs = [{ name: 'home', path: '/' }]
  let currentFullPath = ''

  paths.forEach((name) => {
    currentFullPath += `/${name}`
    breadcrumbs.push({ name, path: currentFullPath })
  })

  return breadcrumbs
}

const Breadcrumbs = ({ currentPath, fetchFiles }) => {
  const breadcrumbs = pathToBreadcrumbs(currentPath)
  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ul className='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className='breadcrumb-item' onClick={() => fetchFiles(breadcrumb.path)}>
            <span>{breadcrumb.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
