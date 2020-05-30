import restify from 'restify'
/*const Redis = require('ioredis')
const redis = new Redis('redis://127.0.0.1:6379', {
  keyPrefix: 'doc:'
})*/
import routes from './routes'
import guard from './lib/guard'
import { makeSequelizeError } from './lib/util'
// const session = require('./lib/session')

const server = restify.createServer({
  name: 'Server',
  version: '1.0.0'
})

server.pre([
  (req, res, next) => {
    res.charSet('utf-8')
    console.log(req.method, req.url)
    return next()
  }/*,
  session({
    client: redis
  })*/
])
server.use(cookieParser)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({
  multiples: true,
  keepExtensions: true,
  uploadDir: './upload',
  hash: 'sha1'
}))

server.get('/api/user', guard.jwtVerify, function (req, res) {
  res.json({ code: 0, data: req.user })
})
server.get('/api/users', guard.jwtVerify, guard.adminRequired, routes.user.getAll)
server.post('/api/users', routes.user.register)
server.post('/api/admin/users', routes.user.adminPost)
server.put('/api/users/:id', guard.jwtVerify, guard.adminRequired, routes.user.adminPut)

server.post('/api/session', routes.user.login)
// server.del('/api/session', guard.jwtVerify, routes.user.logout)

server.get('/api/groups', routes.group.getAll)
server.post('/api/groups', guard.jwtVerify, guard.adminRequired, routes.group.post)
server.put('/api/groups/:id', guard.jwtVerify, guard.adminRequired, routes.group.put)
server.del('/api/groups/:id', guard.jwtVerify, guard.adminRequired, routes.group.del)

server.get('/api/views/:view', guard.jwtVerify, routes.view.get)

server.post('/api/files', routes.system.upload)
server.post('/api/verifyCode', routes.system.sendVerifyCode)

server.on('restifyError', function (req, res, err, callback) {
  res.json(makeSequelizeError(err))
})

server.listen(8020, () => console.log('%s listening at %s', server.name, server.url))
