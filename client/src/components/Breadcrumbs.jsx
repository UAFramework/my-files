import './Breadcrumbs.css'

const Breadcrumbs = ({ currentPath, fetchFiles }) => {
  return (
    <nav aria-label='Breadcrumb' className='breadcrumbs'>
      <ul className='breadcrumb'>
        <li className='breadcrumb-item' onClick={() => fetchFiles('/')}>
          home
        </li>
        {currentPath !== '/' &&
          currentPath
            .split('/')
            .slice(1)
            .map((name, index, array) => {
              const path = `/${array.slice(0, index + 1).join('/')}`

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
