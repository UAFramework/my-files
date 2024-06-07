import { useState, useEffect } from 'react'
import './App.css'
import Breadcrumbs from './components/breadcrumbs'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const [files, setFiles] = useState(null)
  const navigate = useNavigate()

  const fetchFiles = async (path) => {
    const response = await fetch(`/api/content?path=${path}`)
    const data = await response.json()
    setFiles(data)
  }

  useEffect(() => {
    fetchFiles('/')
  }, [])

  const handleBreadcrumbClick = (path) => {
    fetchFiles(path)
    navigate(path)
  }

  return (
    files && (
      <>
        <Breadcrumbs onClick={handleBreadcrumbClick} />
        <h1>{files.path}</h1>
        <ul>
          {files.items?.map(({ type, path, name }, idx) => (
            <li key={`${idx}`}>
              {type === 'folder' ? (
                <button onClick={() => handleBreadcrumbClick(path)}>{name}</button>
              ) : (
                <a href={`/api/content?path=${path}`}>{name}</a>
              )}
            </li>
          ))}
        </ul>
      </>
    )
  )
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<App />} />
      </Routes>
    </Router>
  )
}

export default AppWrapper
