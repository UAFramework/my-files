import './ItemCard.css'
import { Folder as FolderIcon } from 'grommet-icons'
import FileIcon from './FileIcon'

const ItemCard = ({ item, fetchFiles }) => {
  const splittedNameArray = item.name.split('.')
  const fileExtension = splittedNameArray[splittedNameArray.length - 1]

  const handleFolderClick = () => fetchFiles(item.path)

  const handleFileClick = () => {
    // TODO:
    // implement this handler
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
        </div>
      )}
    </li>
  )
}

export default ItemCard
