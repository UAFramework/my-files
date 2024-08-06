import express from 'express'
import cors from 'cors'
import path from 'node:path'
import fs from 'node:fs'
import prettyBytes from 'pretty-bytes'
import { fileURLToPath } from 'url'
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

// path to the current js file:
const __filename = fileURLToPath(import.meta.url)
// path to the parent directoty where the current file belongs:
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())

// middleware for Content-Type application/json
app.use(express.json())

// middleware for Content-Type: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/help', function (request, response) {
  response.format({
    'text/html': () =>
      response.status(200).send(`
        <style>* {font-size: medium; font-family: Helvetica,sans-serif; line-height: 1.6;}</style>
        <b>usage</b>:
        <ul>
            <li>
              directly: <a href="${request.protocol}://${request.hostname}:${request.client.localPort}/content?path=/">
                ${request.protocol}://${request.hostname}:${request.client.localPort}/content?path=/
              </a>
            </li>
            <li>
              through an <b>api</b> proxy: <a href="/content?path=/">
                ${request.protocol}://${request.hostname}:3000/api/content?path=/
              </a>
          </li>
        </ul>`),
  })
})

app.get('/content', function (request, response) {
  if (!request.query?.path) {
    response.status(400).send({ error: '`path` query param is expected!' })
    return
  }

  const rootFolder = process.env.ROOT_FOLDER || '@root'
  const basePath = path.join(process.env.BASE_PATH || '../', rootFolder)
  const contentPath = path.join(basePath, request.query.path)

  if (fs.existsSync(contentPath)) {
    try {
      // check if requested path points to a file or directory:
      const stats = fs.lstatSync(contentPath)
      if (stats.isDirectory()) {
        // if folder, read contect, build the response and send as `content`:
        fs.readdir(contentPath, { encoding: 'utf-8', withFileTypes: true }, (err, listing) => {
          // build content object:
          const content = {
            name: path.parse(contentPath).name,
            type: 'folder',
            path: request.query.path,
            items:
              listing.length === 0
                ? []
                : listing
                    // hide items that have name starting with `.`:
                    .filter((item) => !String(item.name).startsWith('.'))
                    // for the rest of the items collect and map the necessary info:
                    .map((item) => {
                      const itemInfo = {}
                      // assign default properties:
                      Object.assign(itemInfo, {
                        name: item.name,
                        path: path.normalize(path.join(request.query.path, item.name)).replace(/\\/g, '/'),
                        // path: `${request.query.path}/${item.name}`,
                      })

                      if (item.isFile()) {
                        // assign file-specific prperties:
                        Object.assign(itemInfo, {
                          type: 'file',
                          size: prettyBytes(fs.lstatSync(`${contentPath}/${item.name}`).size),
                        })
                      } else {
                        // assign folder-specific prperties:
                        Object.assign(itemInfo, {
                          type: 'folder',
                        })
                      }
                      return itemInfo
                    })
                    .sort(function (a, b) {
                      if (a.type === 'folder' && b.type === 'file') {
                        return -1
                      }
                      if (a.type === 'file' && b.type === 'folder') {
                        return 1
                      }
                      if (a.name < b.name) {
                        return -1
                      }
                      if (a.name > b.name) {
                        return 1
                      }
                      return 0
                    }),
          }
          response.json(content)
        })
      } else {
        response.sendFile(path.normalize(path.join(__dirname, contentPath)))

        /**
         * if file needs to be downloaded as an attachement
         * we should set Content-Disposition header for our response
         * before sending it:
         * response.setHeader('Content-Disposition', `attachment; filename=${encodeURI(path.basename(contentPath))}`)
         * by default it's "inline"
         * response.setHeader('Content-Disposition', 'inline')
         *
         * more about it here:
         * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
         */
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    response.status(404).send({ error: "Requested path couldn't be found" })
  }
})

app.listen(process.env.SERVER_PORT || 5000, function () {
  console.log(`server is running on port ${this.address().port}!`)
})
