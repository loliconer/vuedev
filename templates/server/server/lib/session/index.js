import memory from './memory'
import util from '../util'

export default function (config = {}) {
  const client = config.client || memory
  const sessionCfg = Object.assign({
    ttl: 600,
    length: 36
  }, config)

  const createSession = session => Object.assign(session, {
    save(extra) {
      client.set(session.id, JSON.stringify(Object.assign(session, extra)))
    },
    destroy() {
      client.del(session.id)
    }
  })

  const initSession = (req, res, next) => {
    const sid = util.generateSid(sessionCfg.length)
    const data = { id: sid }

    client.set(sid, JSON.stringify(data))
    req.session = createSession(data)
    res.setHeader('Set-Cookie', `sid=${sid};httpOnly;sameSite=Lax`)
    next()
  }

  const middleware = async (req, res, next) => {
    const cookies = req.headers.cookie

    if (cookies) {
      const arr = cookies.split(/; */).map(a => a.split('='))
      let sid = arr.find(c => c[0] === 'sid')
      sid = sid && sid[1]

      if (await client.exists(sid)) {
        req.session = createSession(JSON.parse(await client.get(sid)))
        next()
      } else {
        initSession(req, res, next)
      }
    } else {
      initSession(req, res, next)
    }
  }

  return middleware
}
