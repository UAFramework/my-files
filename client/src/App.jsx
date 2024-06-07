import { useState, useEffect } from 'react'
import './App.css'
import FileCard from './components/FileCard'

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
        <h1>{files.path}</h1>
        <ul style={{ listStyleType: 'none' }}>
          {files.items?.map(({ type, path, name, size }, idx) => (
            <FileCard type={type} path={path} name={name} size={size} key={`${idx}`} />
          ))}
        </ul>
      </>
    )
  )
}

export default App
