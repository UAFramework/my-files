import './FileCard.css'

import { Folder, DocumentTxt, DocumentImage, Play } from 'grommet-icons'

const FileCard = ({ name, path, type, size }) => {
  const splittedNameArray = name.split('.')
  const fileExtension = splittedNameArray[splittedNameArray.length - 1]

  const renderFileIcon = (fileExtension) => {
    if (fileExtension === 'txt') {
      return <DocumentTxt color='green' />
    } else if (fileExtension === 'jpg') {
      return <DocumentImage color='yellow' />
    } else if (fileExtension === 'mp4') {
      return <Play color='blue' />
    } else {
      return <DocumentTxt color='green' />
    }
  }

  return (
    <li>
      {type === 'folder' ? (
        <div className='file__info'>
          <Folder color='red' size='medium' />
          <a href={`/api/content?path=${path}`} className='file__name'>
            {name}
          </a>
        </div>
      ) : (
        <div className='file__info'>
          {renderFileIcon(fileExtension)}
          <div className='file__description--container'>
            <a href={`/api/content?path=${path}`} className='file__name'>
              {name}
            </a>
            <p className='file__subtitle'>{size}</p>
          </div>
        </div>
      )}
    </li>
  )
}

export default FileCard

// name	"@root"
// type	"folder"
// path	"/"
// items
// 0
// name	"one"
// path	"/one"
// type	"folder"
// 1
// name	"x - y"
// path	"/x - y"
// type	"folder"
// 2
// name	"x y"
// path	"/x y"
// type	"folder"
// 3
// name	"x'y"
// path	"/x'y"
// type	"folder"
// 4
// name	"привіт"
// path	"/привіт"
// type	"folder"
// 5
// name	"11184.jpg"
// path	"/11184.jpg"
// type	"file"
// size	"96.4 kB"
// 6
// name	"Kilted Yoga  - The Jersey Edition.mp4"
// path	"/Kilted Yoga  - The Jersey Edition.mp4"
// type	"file"
// size	"5.01 MB"
// 7
// name	"hello.txt"
// path	"/hello.txt"
// type	"file"
// size	"1.1 kB"

//   <h3>icons
//     // if {type} items is ... file - use icon ..., another  - we use icon
//     </h3>
//   <button onClick={}>//if folder - show only name props without extens, if files - to show name with extensions
// // import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';

//       <h3>{name}</h3> //if folder - show without extens, if files - to show extensions
//       <div>{diet.join(', ')}.</div>
//       <div>{size}</div>
//        </button>

// export default function AnimalCard({ diet, name, size }) {
//   return(
//     <div>
//       <h3>{name}</h3>
//       <div>{size}kg</div>
//       <div>{diet.join(', ')}.</div>
//     </div>
//   )
// }

// AnimalCard.propTypes = {
//   diet: PropTypes.arrayOf(PropTypes.string).isRequired,
//   name: PropTypes.string.isRequired,
//   size: PropTypes.number.isRequired,
// }

// data = {
//   name: 'Kilted Yoga  - The Jersey Edition.mp4',
//   path: '/Kilted Yoga  - The Jersey Edition.mp4',
//   type: 'file',
//   size: '5.01 MB',
// }

// The following npm package, @material-ui/icons, includes the 1,100+ official Material icons converted to SvgIcon components.
