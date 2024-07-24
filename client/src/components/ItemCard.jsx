import './ItemCard.css'
import { Folder as FolderIcon } from 'grommet-icons'
<<<<<<< HEAD
import FileIcon from './FileIcon'

const ItemCard = ({ item, fetchFiles }) => {
=======
import { Layer, Box } from 'grommet'
import { useState } from 'react'
import FileIcon from './FileIcon'

const ItemCard = ({ item, fetchFiles }) => {
  const [showFileContent, setShowFileContent] = useState(false)

>>>>>>> tmp
  const splittedNameArray = item.name.split('.')
  const fileExtension = splittedNameArray[splittedNameArray.length - 1]

  const handleFolderClick = () => fetchFiles(item.path)

  const handleFileClick = () => {
    // TODO:
    // implement this handler
<<<<<<< HEAD
=======
    setShowFileContent(true)
  }

  const onClose = () => setShowFileContent(false)

  const styleIframe = (e) => {
    const style = document.createElement('style')
    style.textContent = `
      body { display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }`
    e.target.contentDocument.head.appendChild(style)
>>>>>>> tmp
  }

  return (
    <li className='file-item'>
      {item.type === 'folder' ? (
        <div className='file-info' onClick={handleFolderClick}>
          <FolderIcon color='magenta' size='medium' />
          {item.name}
        </div>
      ) : (
        <div className='file-info' onClick={handleFileClick}>
          <FileIcon fileExtension={fileExtension} />
          <div className='file-description-container'>
            {item.name}
            <p className='file-subtitle'>{item.size}</p>
          </div>
<<<<<<< HEAD
=======
          {showFileContent && (
            <Layer position='center' onClickOutside={onClose} onEsc={onClose}>
              <Box pad='medium' gap='small' width='large' height='large'>
                <iframe
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  src={`/api/content?path=${item.path}`}
                  title={item.name}
                  onLoad={styleIframe}
                />
              </Box>
            </Layer>
          )}
>>>>>>> tmp
        </div>
      )}
    </li>
  )
}

export default ItemCard
