const http = require('http')
const Router = require('router')
var mongoose = require('mongoose')

var BlogModel = require('./Model/blog')

mongoose.connect('mongodb://localhost:27017/admin', function (error) {
  console.log(error)
})

var router = new Router()

router.get('/', (req, res) => {
  res.writeHead(200)
  res.end('Read.')
})
router.post('/write', (req, res) => {
  let body = ''
  req.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body = body + chunk
  }).on('end', () => {
    var requestData = JSON.parse(body.toString())
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(body.toString())
    res.end()
  })
})

router.get('*', (req, res, next) => {
  return next(new Error('Bad Request'))
})

/**
 *  Middleware code
 **/

router.use(function (err, req, res, next) {
  res.end(err.message)
})

const server = http.createServer((req, res) => {
  router(req, res, (req, res) => {
    console.log(res)
  })
})

server.listen(8000, () => {
  console.log('This is test server.')
})
