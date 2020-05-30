const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../doc.db')
const fs = require('fs')

fs.readFile('update.sql', 'utf8', (err, data) => {
  if (err) throw err

  db.exec(data, function (err) {
    if (err !== null) {
      console.error(err)
    } else {
      console.log('Succeed!')
    }
  })
})

/*
const User = require('../models/User')
const UserGroup = require('../models/UserGroup')

async function fix() {
  const users = await new User().select('id, groups').catch(error => console.error(error))
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const userId = user.id, groups = user.groups.split(',').map(g => Number(g))

    await new UserGroup().insert(groups.map(g => ({ userId, groupId: g }))).catch(error => console.error(error))
  }
}

fix()
*/
