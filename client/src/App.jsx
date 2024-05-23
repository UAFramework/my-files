import { useState, useEffect } from 'react'
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
        <h1>{files.path}</h1>
        <ul>
          {files.items?.map(({ type, path, name }, idx) => (
            <li key={`${idx}`}>{type === 'folder' ? name : <a href={`/api/content?path=${path}`}>{name}</a>}</li>
          ))}
        </ul>
      </>
    )
  )
}

export default App
