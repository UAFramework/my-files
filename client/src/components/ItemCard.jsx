import './ItemCard.css'

import { Folder, DocumentTxt, DocumentImage, Play } from 'grommet-icons'

const ItemCard = ({ name, path, type, size }) => {
  const splittedNameArray = name.split('.')
  const fileExtension = splittedNameArray[splittedNameArray.length - 1]

  const renderFileIcon = (fileExtension) => {
    if (fileExtension === 'txt') {
      return <DocumentTxt color='green' />
    }
    if (fileExtension === 'jpg') {
      return <DocumentImage color='yellow' />
    }
    if (fileExtension === 'mp4') {
      return <Play color='blue' />
    }
  }

  return (
    <li>
      {type === 'folder' ? (
        <div className='file-info'>
          <Folder color='magenta' size='medium' />
          <a href={`/api/content?path=${path}`} className='file-name'>
            {name}
          </a>
        </div>
      ) : (
        <div className='file-info'>
          {renderFileIcon(fileExtension)}
          <div className='file-description-container'>
            <a href={`/api/content?path=${path}`} className='file-name'>
              {name}
            </a>
            <p className='file-subtitle'>{size}</p>
          </div>
        </div>
      )}
    </li>
  )
}

export default ItemCard
