let sessions = {}

const Client = {
  set(sid, data) {
    sessions[sid] = data
  },
  get(sid) {
    return new Promise((resolve, reject) => {
      resolve(sessions[sid] || JSON.stringify({ id: sid }))
    })
  },
  exists(sid) {
    return new Promise((resolve, reject) => {
      resolve(sid in sessions)
    })
  },
  del(sid) {
    delete sessions[sid]
  },
  empty() {
    sessions = {}
  }
}

export default Client
