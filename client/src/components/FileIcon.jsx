import { DocumentTxt, DocumentImage, Play } from 'grommet-icons'

function FileIcon({ fileExtension }) {
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

export default FileIcon
