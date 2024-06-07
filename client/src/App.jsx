import { useState, useEffect } from 'react'
import Breadcrumbs from './components/breadcrumbs'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import ItemCard from './components/ItemCard'
import './App.css'

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
        <ul style={{ listStyleType: 'none' }}>
          {files.items?.map((item, idx) => (
            <ItemCard key={`${idx}`} item={item} fetchFiles={fetchFiles} />
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
