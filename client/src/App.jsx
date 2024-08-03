import { useState, useEffect } from 'react'
import Breadcrumbs from './components/Breadcrumbs'
import ItemCard from './components/ItemCard'
import './App.css'

function App() {
  const [files, setFiles] = useState(null)

  const fetchFiles = async (path) => {
    const response = await fetch(`/api/content?path=${path}`)
    const data = await response.json()
    setFiles(data)
  }

  useEffect(() => {
    fetchFiles('/')
  }, [])

  return (
    files && (
      <>
        <Breadcrumbs currentPath={files.path} fetchFiles={fetchFiles} />
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

export default App
